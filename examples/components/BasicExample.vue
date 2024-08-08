<template>
  <div class="example-container">
    <h2>Basic Typing Effect</h2>
    <div class="typing-box">
      <TypingEffect
        text="안녕하세요.\n 이것은\b\b\b 기본 예제입니다.\n 타이핑이 종료되면 커서가 사라집니다."
        :showCursor="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import TypingEffect from "../../src/TypingEffect.vue";

export default {
  components: {
    TypingEffect,
  },
};
</script>
