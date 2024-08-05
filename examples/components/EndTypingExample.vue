<template>
  <div class="example-container">
    <h2>Typing Effect with End Functionality</h2>
    <div class="typing-box">
      <TypingEffect
        ref="typingEffect"
        text="안녕하세요.\n 타이핑을 종료하는 예제입니다."
        :intervalType="80"
      />
    </div>
    <div class="button-group">
      <button class="control-button" @click="endTyping">타이핑 종료</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import TypingEffect from "../../src/TypingEffect.vue";

export default {
  components: {
    TypingEffect,
  },
  setup() {
    const typingEffect = ref<InstanceType<typeof TypingEffect> | null>(null);

    const endTyping = () => {
      typingEffect.value?.endTyping();
    };

    return {
      endTyping,
      typingEffect,
    };
  },
};
</script>
