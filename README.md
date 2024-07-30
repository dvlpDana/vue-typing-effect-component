# Vue Typing Effect Component

한글 자음 모음 결합에 타이핑 효과를 제공하는 Vue.js 컴포넌트로, 커스터마이징 가능한 타이핑 속도, 사람처럼 보이는 타이핑 간격, 텍스트 추가, 애니메이션 반복, 사용자 정의 스타일 및 클래스를 지원합니다.

## 특징

- 커스터마이징 가능한 타이핑 속도 및 간격
- 사람처럼 보이는 타이핑 효과
- 새 텍스트 추가 옵션
- 애니메이션 반복
- 사용자 정의 스타일 및 클래스 적용

## 설치

컴포넌트를 설치하려면 npm을 사용할 수 있습니다.

```bash
npm install vue-typing-effect-component
```

## Usage

프로젝트에서 컴포넌트를 import하여 사용합니다.

#### 기본 사용법
```vue
<template>
  <div id="app">
    <TypingEffect
      text="Hello, this is a typing effect component."
      :intervalType="100"
      :humanize="50"
      :append="false"
      customClass="my-custom-class"
      :customStyle="{ color: 'blue', fontSize: '24px' }"
      :repeat="true"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TypingEffect from 'vue-typing-effect-component';

export default defineComponent({
  name: 'App',
  components: {
    TypingEffect,
  },
});
</script>
```

## Props

|Prop|Type|Default|Description|
|---|---|---|---|
|text|String|null|표시할 텍스트입니다. 제공되지 않으면 지정된 선택기의 텍스트를 사용합니다.|
|append|Boolean|false|기존 텍스트에 새 텍스트를 추가할지 여부를 설정합니다.
|intervalType|Number|120|각 문자를 타이핑하는 간격입니다.
|humanize|Number|Function|null|간격을 랜덤화하여 사람처럼 보이도록 합니다. 숫자가 제공되면 0부터 해당 숫자 사이의 랜덤 값을 간격에 추가합니다. 함수가 제공되면 기본 간격을 인수로 받고 새로운 간격을 반환해야 합니다.
|selector|String|null|텍스트 내용을 사용할 요소를 선택하는 CSS 선택기입니다.
|customClass|String|""|타이핑 요소에 적용할 사용자 정의 클래스입니다.
|customStyle|Object|{}|타이핑 요소에 적용할 사용자 정의 스타일입니다.
|repeat|Boolean|false|타이핑 애니메이션을 반복할지 여부를 설정합니다.

### Append 속성 변경 예제

append 속성을 동적으로 변경할 수 있습니다. 아래의 예제와 같이 부모 컴포넌트에서 setTimeout을 사용할 수 있습니다.

```vue
<template>
  <div id="app">
    <TypingEffect
      :text="firstText"
      :intervalType="150"
      :humanize="30"
      :append="isAppend"
      customClass="text-lg font-bold"
      :customStyle="{ color: 'black' }"
      :repeat="true"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import TypingEffect from './components/TypingEffect.vue';

export default defineComponent({
  name: 'App',
  components: {
    TypingEffect,
  },
  setup() {
    const isAppend = ref(true);

    const firstText = ref("Hello, this is the basic typing effect.");


    onMounted(() => {
      setTimeout(() => {
        isAppend.value = false;
      }, 10000); // Change append to false after 10 seconds
    });

    return {
      isAppend,
      firstText,
    };
  },
});
</script>

<style>
.text-lg {
  font-size: 1.125rem;
}

.font-bold {
  font-weight: bold;
}

</style>
```

## Contributing

이 프로젝트에 기여하고 싶다면, GitHub 저장소에서 issue나 pull request를 제출해주세요.

## License

This project is licensed under the MIT License.
