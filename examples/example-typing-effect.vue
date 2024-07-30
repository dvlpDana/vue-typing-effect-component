<template>
  <div id="app">
    <!-- 첫 번째 타이핑 효과: 기본 설정 -->
    <TypingEffect
      :text="firstText"
      :intervalType="150"
      :humanize="30"
      :append="isAppend"
      customClass="text-lg font-bold"
      :customStyle="{ color: 'black' }"
      :repeat="true"
    />

    <!-- 두 번째 타이핑 효과: 빨간색 텍스트, 폰트 크기 24px -->
    <TypingEffect
      :text="secondText"
      :intervalType="100"
      :humanize="20"
      :append="isAppend"
      customClass="text-2xl"
      :customStyle="{ color: 'red' }"
      :repeat="false"
    />

    <!-- 세 번째 타이핑 효과: 녹색 텍스트, 폰트 크기 18px, 밑줄 -->
    <TypingEffect
      :text="thirdText"
      :intervalType="200"
      :humanize="50"
      :append="isAppend"
      customClass="text-xl underline"
      :customStyle="{ color: 'green' }"
      :repeat="true"
    />

    <!-- 네 번째 타이핑 효과: 파란색 텍스트, 애니메이션 효과 -->
    <TypingEffect
      :text="fourthText"
      :intervalType="80"
      :humanize="10"
      :append="isAppend"
      customClass="text-lg"
      :customStyle="{ color: 'blue' }"
      :repeat="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import TypingEffect from "../src/TypingEffect.vue";

export default defineComponent({
  components: {
    TypingEffect,
  },
  setup() {
    const isAppend = ref(true);

    const firstText = ref(" 안녕하세요, 여기는 기본 설정의 타이핑 효과입니다.");
    const secondText = ref(" 여기는 빨간색 텍스트와 큰 폰트 크기입니다.");
    const thirdText = ref(
      " 여기는 녹색 텍스트와 밑줄이 있는 타이핑 효과입니다."
    );
    const fourthText = ref(" 여기는 파란색 텍스트와 애니메이션 효과입니다.");

    onMounted(() => {
      setTimeout(() => {
        isAppend.value = false;
      }, 100000); // 1분 후 append를 false로 변경
    });

    return {
      isAppend,
      firstText,
      secondText,
      thirdText,
      fourthText,
    };
  },
});
</script>

<style>
/* 첫 번째 타이핑 효과 스타일 */
.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: bold;
}

/* 두 번째 타이핑 효과 스타일 */
.text-2xl {
  font-size: 1.5rem;
}

/* 세 번째 타이핑 효과 스타일 */
.text-xl {
  font-size: 1.25rem;
}

.underline {
  text-decoration: underline;
}

/* 네 번째 타이핑 효과 스타일 */
.text-lg {
  font-size: 1.125rem;
}

/* 애니메이션 키프레임 */
@keyframes typing-blink {
  from {
    border-right: 2px solid black;
  }
  to {
    border-right: 2px solid transparent;
  }
}

@keyframes typing-fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
}
</style>
