<template>
  <div
    ref="typingElement"
    :class="customClass"
    :style="computedCustomStyle"
  ></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from "vue";
import Hangul from "hangul-js";

export default defineComponent({
  name: "TypingEffect",
  props: {
    text: {
      type: String,
      default: null,
    },
    append: {
      type: Boolean,
      default: false,
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
  },
  setup(props) {
    const typingElement = ref<HTMLElement | null>(null);
    let currentText = ref("");
    let typingInterval: number | undefined = undefined;

    const computedCustomStyle = computed(() => {
      return {
        ...props.customStyle,
      };
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
          if (props.append) {
            textToType = currentText.value + textToType;
          } else {
            currentText.value = ""; // 새로 타이핑을 시작할 때 currentText를 초기화
          }

          typeText(textToType, props.intervalType, typingElement.value);
        }
      }
    };

    watch(() => props.text, startTyping);

    onMounted(() => {
      startTyping();
    });

    const getRandomInterval = (baseInterval: number) => {
      if (typeof props.humanize === "number") {
        return baseInterval + Math.random() * props.humanize;
      } else if (typeof props.humanize === "function") {
        return props.humanize(baseInterval);
      } else {
        return baseInterval;
      }
    };

    const typeText = (
      text: string,
      baseInterval: number,
      element: HTMLElement
    ) => {
      let index = currentText.value.length
        ? Hangul.disassemble(currentText.value).length
        : 0;
      const splitText = Hangul.disassemble(text);
      let assembledText: string[] = currentText.value
        ? Hangul.disassemble(currentText.value)
        : [];

      typingInterval = setInterval(() => {
        if (index < splitText.length) {
          assembledText.push(splitText[index]);
          element.innerHTML = Hangul.assemble(assembledText);
          index++;
          currentText.value = Hangul.assemble(assembledText);
        } else {
          clearInterval(typingInterval);
          if (props.repeat) {
            index = 0;
            assembledText = [];
            setTimeout(() => {
              startTyping(); // repeat이 true이면 타이핑을 다시 시작
            }, getRandomInterval(baseInterval));
          }
        }
      }, getRandomInterval(baseInterval));
    };

    return {
      typingElement,
      computedCustomStyle,
      currentText,
    };
  },
});
</script>
