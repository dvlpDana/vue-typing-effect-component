# Vue Typing Effect Component

![Codecov](https://codecov.io/gh/dvlpDana/vue-typing-effect-component/branch/main/graph/badge.svg)

한글 자음 모음 결합에 타이핑 효과를 제공하는 Vue.js 컴포넌트로, 커스터마이징 가능한 타이핑 속도, 사람처럼 보이는 타이핑 간격, 텍스트 추가, 애니메이션 반복, 사용자 정의 스타일 및 클래스를 지원합니다.

## 특징

- 커스터마이징 가능한 타이핑 속도 및 간격
- 사람처럼 보이는 타이핑 효과
- 애니메이션 반복
- 사용자 정의 스타일 및 클래스 적용
- 백스페이스 및 줄바꿈("\b", "\n") 지원
- 타이핑 종료 후 커서 유지 옵션

## 설치

컴포넌트를 설치하려면 npm을 사용할 수 있습니다.

```bash
npm install vue-typing-effect-component
```


## Props

|Prop|Type|Default|Description|
|---|---|---|---|
|text|String|null|표시할 텍스트입니다. 제공되지 않으면 지정된 선택기의 텍스트를 사용합니다.|
|intervalType|Number|120|각 문자를 타이핑하는 간격입니다.
|humanize|Number⎪Function|null|간격을 랜덤화하여 사람처럼 보이도록 합니다. Number가 제공되면 0부터 해당 숫자 사이의 랜덤 값을 간격에 추가합니다. Function이 제공되면 기본 간격을 인수로 받고 새로운 간격을 반환해야 합니다.
|selector|String|null|텍스트 내용을 사용할 요소를 선택하는 CSS 선택기입니다.
|customClass|String|""|타이핑 요소에 적용할 사용자 정의 클래스입니다.
|customStyle|Object|{}|타이핑 요소에 적용할 사용자 정의 스타일입니다.
|showCursor|Boolean|false|타이핑 동안 커서를 표시할지 여부를 설정합니다.
|cursorAfterTyping|Boolean|false|타이핑 종료 후 커서를 유지할지 여부를 설정합니다.

## Usage

프로젝트에서 컴포넌트를 import하여 사용합니다.

#### 기본 사용법
```vue
<template>
  <div class="example-container">
    <h2>Basic Typing Effect</h2>
    <div class="typing-box">
      <TypingEffect
        text="안녕하세요.\n기본 예제입니다."
      />
    </div>
  </div>
</template>

<script lang="ts">
import TypingEffect from "@/TypingEffect.vue";

export default {
  components: {
    TypingEffect,
  },
};
</script>
```

#### 타이핑 효과 중간에 일시정지 및 재개
```vue
<template>
  <div class="example-container">
    <h2>Typing Effect with Pause and Resume</h2>
    <div class="typing-box">
      <TypingEffect
        ref="typingEffect"
        text="타이핑 효과를 일시정지하고 다시 시작합니다."
        :intervalType="50"
        :humanize="20"
        :showCursor="true"
      />
    </div>
    <div class="button-group">
      <button @click="pauseTyping">Pause</button>
      <button @click="resumeTyping">Resume</button>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import TypingEffect from "@/TypingEffect.vue";

export default {
  components: {
    TypingEffect,
  },
  setup() {
    const typingEffect = ref(null);

    const pauseTyping = () => {
      typingEffect.value.pauseTyping();
    };

    const resumeTyping = () => {
      typingEffect.value.resumeTyping();
    };

    return {
      pauseTyping,
      resumeTyping,
      typingEffect,
    };
  },
};
</script>
```

#### 컴포넌트 외부의 특정 요소에서 텍스트를 선택하여 타이핑 효과를 적용
```vue
<template>
  <div class="example-container">
    <h2>Typing Effect with Selector</h2>
    <div class="source-text" id="source-text">
      이 텍스트는 외부 요소에서 가져와 타이핑 됩니다.
    </div>
    <div class="typing-box">
      <TypingEffect
        selector="#source-text"
        :intervalType="100"
        :showCursor="true"
        :cursorAfterTyping="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
import TypingEffect from "@/TypingEffect.vue";

export default {
  components: {
    TypingEffect,
  },
};
</script>
```

## Contributing

이 프로젝트에 기여하고 싶다면, GitHub 저장소에서 issue나 pull request를 제출해주세요.

## License

This project is licensed under the MIT License.
