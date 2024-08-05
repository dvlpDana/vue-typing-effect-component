<template>
  <p ref="typingElement" :class="customClass" :style="computedCustomStyle">
    <template v-for="(c, index) in reContents" :key="index">
      <span>{{ c }}</span
      ><br v-if="index < reContents.length - 1" />
    </template>
    <span
      v-if="showCursor"
      class="cursor"
      :style="{
        display: isTyping || cursorAfterTyping ? 'inline-block' : 'none',
      }"
    ></span>
  </p>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  computed,
  watch,
  onUnmounted,
} from "vue";
import { disassembleHangul, assembleHangul } from "@/hangulHelper";
import { HangulChar } from "@/HangulTypes";

export default defineComponent({
  name: "TypingEffect",
  props: {
    text: {
      type: String,
      default: null,
    },
    intervalType: {
      type: Number,
      default: 120,
    },
    humanize: {
      type: [Number, Function],
      default: null,
    },
    selector: {
      type: String,
      default: null,
    },
    customClass: {
      type: String,
      default: "",
    },
    customStyle: {
      type: Object,
      default: () => ({}),
    },
    repeat: {
      type: Boolean,
      default: false,
    },
    showCursor: {
      type: Boolean,
      default: false,
    },
    cursorAfterTyping: {
      type: Boolean,
      default: false, // 타이핑 종료 후 커서를 유지할지 여부
    },
  },
  setup(props) {
    const typingElement = ref<HTMLElement | null>(null);
    let currentText = ref("");
    let typingInterval: ReturnType<typeof setInterval> | undefined;
    let isPaused = ref(false);
    let isTyping = ref(true); // isTyping의 초기값을 true로 설정하여 커서가 처음부터 보이도록 설정
    let currentIndex = ref(0); // 현재 인덱스를 상태로 관리

    const computedCustomStyle = computed(() => {
      return {
        ...props.customStyle,
      };
    });

    const reContents = computed(() => {
      return currentText.value.split("\n");
    });

    const startTyping = () => {
      if (typingInterval !== undefined) {
        clearInterval(typingInterval);
      }
      if (typingElement.value) {
        let textToType: string | null = props.text;
        if (!textToType && props.selector) {
          const selectedElement = document.querySelector(props.selector);
          textToType = selectedElement ? selectedElement.textContent : "";
        }

        if (textToType) {
          currentText.value = ""; // 새로 타이핑을 시작할 때 currentText를 초기화
          currentIndex.value = 0; // 인덱스를 초기화
          isTyping.value = true; // 타이핑 시작 시 isTyping을 true로 설정
          typeText(textToType, props.intervalType, typingElement.value);
        }
      }
    };

    const pauseTyping = () => {
      isPaused.value = true;
      if (typingInterval !== undefined) {
        clearInterval(typingInterval);
      }
    };

    const resumeTyping = () => {
      isPaused.value = false;
      if (typingElement.value && props.text) {
        typeText(props.text, props.intervalType, typingElement.value, true);
      }
    };

    const endTyping = () => {
      isPaused.value = false;
      if (typingInterval !== undefined) {
        clearInterval(typingInterval);
      }
      isTyping.value = false; // 타이핑 종료 시 isTyping을 false로 설정
    };

    const getRandomInterval = (baseInterval: number) => {
      if (typeof props.humanize === "number") {
        return baseInterval + Math.random() * props.humanize;
      }
      if (typeof props.humanize === "function") {
        return props.humanize(baseInterval);
      }
      return baseInterval;
    };

    const typeText = (
      text: string,
      baseInterval: number,
      element: HTMLElement,
      resume = false
    ) => {
      let index = resume ? currentIndex.value : 0;
      const splitText = disassembleHangul(text) as HangulChar[];
      let assembledText: HangulChar[] = resume
        ? (disassembleHangul(currentText.value) as HangulChar[])
        : [];

      typingInterval = setInterval(() => {
        if (index < splitText.length) {
          assembledText.push(splitText[index]);
          const assembled = assembleHangul(assembledText);
          currentText.value = assembled;
          index++;
          currentIndex.value = index; // 현재 인덱스를 저장
        } else {
          clearInterval(typingInterval);
          isTyping.value = false; // 타이핑이 완료되면 isTyping을 false로 설정
          if (!props.cursorAfterTyping && !isTyping.value) {
            typingElement.value?.querySelector(".cursor")?.remove(); // 커서를 완전히 제거
          }
          if (props.repeat) {
            currentIndex.value = 0; // 반복 시 인덱스를 초기화
            assembledText = [];
            setTimeout(() => {
              typeText(text, baseInterval, element, false); // repeat이 true이면 타이핑을 다시 시작
            }, getRandomInterval(baseInterval));
          }
        }
      }, getRandomInterval(baseInterval));
    };

    onMounted(() => {
      startTyping();
    });

    onUnmounted(() => {
      if (typingInterval !== undefined) {
        clearInterval(typingInterval);
      }
    });

    watch(() => props.text, startTyping);

    return {
      typingElement,
      computedCustomStyle,
      currentText,
      pauseTyping,
      resumeTyping,
      endTyping,
      startTyping,
      isTyping,
      reContents,
    };
  },
});
</script>

<style scoped>
.cursor {
  width: 1px;
  height: 1.2em;
  background-color: #666;
  margin-left: 2px;
  position: relative;
  top: 2px;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
