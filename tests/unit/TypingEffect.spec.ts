import { mount } from "@vue/test-utils";
import TypingEffect from "@/components/TypingEffect.vue";
import { nextTick } from "vue";

// Jest 타임아웃 설정
jest.setTimeout(30000); // 30초로 설정

const waitForTyping = async (
  text: string,
  interval: number,
  humanize: number
) => {
  const totalInterval = text.length * (interval + humanize) + 2000;
  await new Promise((resolve) => setTimeout(resolve, totalInterval));
};

describe("TypingEffect.vue", () => {
  it("renders props.text when passed", async () => {
    const text = "안녕하세요, 여기는 타이핑 효과 컴포넌트입니다.";
    const wrapper = mount(TypingEffect, {
      props: { text, intervalType: 50, humanize: 30 },
    });

    // 텍스트 전체가 타이핑될 때까지 충분히 기다립니다.
    await waitForTyping(text, 50, 30);

    expect(wrapper.text()).toBe(text);
  });

  it("applies custom class and style", async () => {
    const text = "안녕하세요, 여기는 타이핑 효과 컴포넌트입니다.";
    const customClass = "custom-typing-class";
    const customStyle = { color: "red", fontSize: "24px" };
    const wrapper = mount(TypingEffect, {
      props: { text, customClass, customStyle, intervalType: 50, humanize: 30 },
    });

    // 텍스트 전체가 타이핑될 때까지 충분히 기다립니다.
    await waitForTyping(text, 50, 30);

    const typingElement = wrapper.find(`.${customClass}`);
    expect(typingElement.exists()).toBe(true);
    const elementStyle = typingElement.element as HTMLElement;
    expect(elementStyle.style.color).toBe("red");
    expect(elementStyle.style.fontSize).toBe("24px");
  });

  it("handles append mode", async () => {
    const initialText = "타이핑";
    const appendedText = " 효과 컴포넌트입니다.";
    const wrapper = mount(TypingEffect, {
      props: { text: initialText, intervalType: 50, humanize: 30 },
    });

    // 초기 텍스트를 타이핑합니다.
    await waitForTyping(initialText, 50, 30);

    wrapper.setProps({ text: appendedText, append: true });
    await nextTick(); // 상태 업데이트를 기다립니다.

    await waitForTyping(appendedText, 50, 30);

    expect(wrapper.text()).toBe(initialText + appendedText);
  });

  it("handles humanize function", async () => {
    const text = "안녕하세요, 여기는 타이핑 효과 컴포넌트입니다.";
    const humanize = (interval: number) => interval * 2;
    const wrapper = mount(TypingEffect, {
      props: { text, humanize, intervalType: 50 },
    });

    // 텍스트 전체가 타이핑될 때까지 충분히 기다립니다.
    await waitForTyping(text, 50, 100);

    expect(wrapper.text()).toBe(text);
  });

  it("dynamically changes append property", async () => {
    const initialText = "첫 번째 부분";
    const appendedText = " 두 번째 부분입니다.";
    const finalText = "최종 부분입니다.";
    const wrapper = mount(TypingEffect, {
      props: {
        text: initialText,
        intervalType: 50,
        humanize: 30,
        append: true,
      },
    });

    // 첫 번째 텍스트를 타이핑합니다.
    await waitForTyping(initialText, 50, 30);

    // 두 번째 텍스트를 append 모드로 타이핑합니다.
    wrapper.setProps({ text: appendedText, append: true });
    await nextTick(); // 상태 업데이트를 기다립니다.
    await waitForTyping(appendedText, 50, 30);

    // append 속성을 false로 변경하고 세 번째 텍스트를 타이핑합니다.
    wrapper.setProps({ text: finalText, append: false });
    await nextTick(); // 상태 업데이트를 기다립니다.
    await waitForTyping(finalText, 50, 30);

    expect(wrapper.text()).toBe(initialText + appendedText + finalText);
  });
});
