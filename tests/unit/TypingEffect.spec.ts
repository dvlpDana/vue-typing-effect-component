import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import TypingEffect from "@/TypingEffect.vue";

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
  afterEach(() => {
    jest.clearAllTimers(); // 모든 타이머를 정리합니다.
  });

  it("renders props.text when passed", async () => {
    const text = "안녕하세요, 여기는 타이핑 효과 컴포넌트입니다.";
    const wrapper = mount(TypingEffect, {
      props: { text, intervalType: 50, humanize: 30 },
    });

    // 텍스트 전체가 타이핑될 때까지 충분히 기다립니다.
    await waitForTyping(text, 50, 30);

    expect(wrapper.text()).toBe(text);
  });

  it("pauses and resumes typing", async () => {
    const text = "타이핑 효과를 일시정지하고 다시 시작합니다.";
    const wrapper = mount(TypingEffect, {
      props: { text, intervalType: 50, humanize: 30 },
    });

    // 일시정지하기 전에 잠깐 타이핑
    await new Promise((resolve) => setTimeout(resolve, 500));
    wrapper.vm.pauseTyping();

    // 일시정지 후 1초 기다린 다음 재개
    await new Promise((resolve) => setTimeout(resolve, 1000));
    wrapper.vm.resumeTyping();

    await waitForTyping(text, 50, 30);

    expect(wrapper.text()).toBe(text);
  });

  it("stops typing when endTyping is called", async () => {
    const text = "이 텍스트는 중간에 멈춥니다.";
    const wrapper = mount(TypingEffect, {
      props: { text, intervalType: 50, humanize: 30 },
    });

    // 일부 텍스트가 타이핑된 후 종료합니다.
    setTimeout(() => wrapper.vm.endTyping(), 500);

    await waitForTyping(text, 50, 30);

    expect(wrapper.text()).not.toBe(text);
    expect(wrapper.text().length).toBeLessThan(text.length);
  });

  it("handles backspace character", async () => {
    const text = "이것은\b\b\b 백스페이스 효과";
    const wrapper = mount(TypingEffect, {
      props: { text, intervalType: 50, humanize: 30 },
    });

    await waitForTyping(text, 50, 30);

    expect(wrapper.text()).toBe("백스페이스 효과");
  });

  it("removes cursor after typing ends", async () => {
    const text = "커서가 깜빡이다가 타이핑이 종료되면 사라집니다.";
    const wrapper = mount(TypingEffect, {
      props: { text, intervalType: 50, humanize: 30, showCursor: true },
    });

    await waitForTyping(text, 50, 30);

    await nextTick();

    const cursorElement = wrapper.find(".cursor");
    expect(cursorElement.exists()).toBe(false);
  });

  it("handles newline character", async () => {
    const text = "첫 번째 줄입니다.\n두 번째 줄입니다.";
    const wrapper = mount(TypingEffect, {
      props: { text, intervalType: 50, humanize: 30 },
    });

    await waitForTyping(text, 50, 30);

    const content = wrapper.html();
    expect(content).toContain("<br>");
    expect(wrapper.text()).toBe("첫 번째 줄입니다.두 번째 줄입니다.");
  });

  it("keeps cursor after typing ends when cursorAfterTyping is true", async () => {
    const text = "커서가 타이핑 종료 후에도 유지됩니다.";
    const wrapper = mount(TypingEffect, {
      props: {
        text,
        intervalType: 50,
        humanize: 30,
        showCursor: true,
        cursorAfterTyping: true,
      },
    });

    await waitForTyping(text, 50, 30);

    const cursorElement = wrapper.find(".cursor");
    expect(cursorElement.exists()).toBe(true);
  });
});
