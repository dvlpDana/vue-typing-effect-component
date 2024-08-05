// hangulHelper.ts

import { Cho, Jung, Jong, HangulChar } from "@/HangulTypes";
// 초성, 중성, 종성 배열 선언
const CHO: Cho[] = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];
const JUNG: Jung[] = [
  "ㅏ",
  "ㅐ",
  "ㅑ",
  "ㅒ",
  "ㅓ",
  "ㅔ",
  "ㅕ",
  "ㅖ",
  "ㅗ",
  "ㅘ",
  "ㅙ",
  "ㅚ",
  "ㅛ",
  "ㅜ",
  "ㅝ",
  "ㅞ",
  "ㅟ",
  "ㅠ",
  "ㅡ",
  "ㅢ",
  "ㅣ",
];
const JONG: Jong[] = [
  "",
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

// 자모와 복합 자모 처리
const CONSONANTS = [
  "ㄱ",
  "ㄲ",
  "ㄳ",
  "ㄴ",
  "ㄵ",
  "ㄶ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅄ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const COMPLEX_CONSONANTS: [Jong, Jong, Jong][] = [
  ["ㄱ", "ㅅ", "ㄳ"],
  ["ㄴ", "ㅈ", "ㄵ"],
  ["ㄴ", "ㅎ", "ㄶ"],
  ["ㄹ", "ㄱ", "ㄺ"],
  ["ㄹ", "ㅁ", "ㄻ"],
  ["ㄹ", "ㅂ", "ㄼ"],
  ["ㄹ", "ㅅ", "ㄽ"],
  ["ㄹ", "ㅌ", "ㄾ"],
  ["ㄹ", "ㅍ", "ㄿ"],
  ["ㄹ", "ㅎ", "ㅀ"],
  ["ㅂ", "ㅅ", "ㅄ"],
];

const COMPLEX_VOWELS: [Jung, Jung, Jung][] = [
  ["ㅗ", "ㅏ", "ㅘ"],
  ["ㅗ", "ㅐ", "ㅙ"],
  ["ㅗ", "ㅣ", "ㅚ"],
  ["ㅜ", "ㅓ", "ㅝ"],
  ["ㅜ", "ㅔ", "ㅞ"],
  ["ㅜ", "ㅣ", "ㅟ"],
  ["ㅡ", "ㅣ", "ㅢ"],
];

const HANGUL_OFFSET = 0xac00;

// HashMap을 생성하는 함수
function createHash(array: string[]) {
  const hash: Record<number, number> = {}; // Key를 number로 사용
  array.forEach((item, index) => {
    hash[item.charCodeAt(0)] = index; // Key를 charCode로 설정
  });
  return hash;
}

// 복합 자모를 처리하는 HashMap을 생성하는 함수
function createComplexHash(array: [string, string, string][]) {
  const hash: Record<number, Record<number, number>> = {};
  array.forEach(([first, second, result]) => {
    const firstCode = first.charCodeAt(0);
    const secondCode = second.charCodeAt(0);
    const resultCode = result.charCodeAt(0);

    if (!hash[firstCode]) {
      hash[firstCode] = {};
    }
    hash[firstCode][secondCode] = resultCode;
  });
  return hash;
}

// Hash 생성
const CHO_HASH = createHash(CHO);
const JUNG_HASH = createHash(JUNG);
const JONG_HASH = createHash(JONG);

const COMPLEX_CONSONANTS_HASH = createComplexHash(COMPLEX_CONSONANTS);
const COMPLEX_VOWELS_HASH = createComplexHash(COMPLEX_VOWELS);

// Utility Functions
function _isCho(c: number): boolean {
  return typeof CHO_HASH[c] !== "undefined";
}

function _isJung(c: number): boolean {
  return typeof JUNG_HASH[c] !== "undefined";
}

function _isJong(c: number): boolean {
  return typeof JONG_HASH[c] !== "undefined";
}

function _isHangul(c: number): boolean {
  return 0xac00 <= c && c <= 0xd7a3;
}

function _isJungJoinable(a: number, b: number): number | false {
  return COMPLEX_VOWELS_HASH[a] && COMPLEX_VOWELS_HASH[a][b]
    ? COMPLEX_VOWELS_HASH[a][b]
    : false;
}

function _isJongJoinable(a: number, b: number): number | false {
  return COMPLEX_CONSONANTS_HASH[a] && COMPLEX_CONSONANTS_HASH[a][b]
    ? COMPLEX_CONSONANTS_HASH[a][b]
    : false;
}

// Disassemble Function
function disassembleHangul(
  string: string,
  grouped = false
): HangulChar[] | HangulChar[][] {
  if (string === null) {
    throw new Error("Arguments cannot be null");
  }

  let result: HangulChar[] | HangulChar[][] = [];
  const length = string.length;

  for (let i = 0; i < length; i++) {
    let temp: HangulChar[] = [];
    const char = string[i];

    // Backslash and 'b' sequence handling for "\b"
    if (char === "\\" && i < length - 1 && string[i + 1] === "b") {
      temp.push("\b" as HangulChar);
      i++; // Skip the 'b' character
    }
    // Handling for "\n"
    else if (char === "\\" && i < length - 1 && string[i + 1] === "n") {
      temp.push("\n" as HangulChar);
      i++; // Skip the 'n' character
    } else {
      let code = char.charCodeAt(0);

      if (_isHangul(code)) {
        code -= HANGUL_OFFSET;

        const jongIndex = code % 28;
        const jungIndex = Math.floor((code - jongIndex) / 28) % 21;
        const choIndex = Math.floor((code - jongIndex) / 28 / 21);

        const cho = CHO[choIndex];
        const jung = JUNG[jungIndex];
        const jong = jongIndex === 0 ? "" : JONG[jongIndex];

        temp.push(cho);

        // 중성 처리
        if (_isJung(jung.charCodeAt(0))) {
          temp.push(jung);
        } else {
          temp = temp.concat(jung);
        }

        // 종성 처리
        if (jong) {
          if (_isJong(jong.charCodeAt(0))) {
            temp.push(jong);
          } else {
            temp = temp.concat(jong);
          }
        }
      } else {
        temp.push(char as HangulChar); // 한글이 아닌 경우 그대로 추가
      }
    }

    if (grouped) {
      (result as HangulChar[][]).push(temp);
    } else {
      result = (result as HangulChar[]).concat(temp);
    }
  }

  return result;
}

function assembleHangul(disassembled: HangulChar[]): string {
  let result = "";
  let cho: Cho | undefined;
  let jung: Jung | undefined;
  let jong: Jong | undefined;

  for (let i = 0; i < disassembled.length; i++) {
    const char = disassembled[i];
    if (char === "\b") {
      // 백스페이스 문자를 만나면 마지막 한글 글자를 삭제
      if (result.length > 0) {
        const lastChar = result[result.length - 1];
        if (_isHangul(lastChar.charCodeAt(0))) {
          result = result.slice(0, -1);
        } else {
          result = result.slice(0, -1);
        }
      }
      cho = undefined;
      jung = undefined;
      jong = undefined;
    } else if (_isCho(char.charCodeAt(0))) {
      if (cho && jung) {
        // 초성과 중성이 이미 있고, 새로운 초성이 왔을 때
        if (jong) {
          // 종성이 이미 있으면, 기존 문자 조합
          result += combineHangul(cho, jung, jong);
          cho = char as Cho;
          jung = undefined;
          jong = undefined;
        } else {
          // 종성이 없을 때, 다음 문자가 중성인지 종성인지 판단해야 함
          if (
            i + 1 < disassembled.length &&
            _isJung(disassembled[i + 1].charCodeAt(0))
          ) {
            // 다음 문자가 중성이면 현재 문자를 새로운 초성으로 간주
            result += combineHangul(cho, jung);
            cho = char as Cho;
            jung = undefined;
          } else {
            // 다음 문자가 중성이 아니면 종성으로 간주
            jong = char as Jong;
          }
        }
      } else {
        // 아직 초성이나 중성이 없으면 초성으로 처리
        cho = char as Cho;
      }
    } else if (_isJung(char.charCodeAt(0))) {
      if (jung) {
        // 복합 모음 처리
        const combinedVowel = _isJungJoinable(
          jung.charCodeAt(0),
          char.charCodeAt(0)
        );
        if (combinedVowel) {
          jung = String.fromCharCode(combinedVowel) as Jung;
        } else {
          result += combineHangul(cho, jung, jong);
          cho = undefined;
          jung = char as Jung;
          jong = undefined;
        }
      } else {
        jung = char as Jung;
      }
    } else if (_isJong(char.charCodeAt(0))) {
      if (jung) {
        // 종성을 처리
        if (jong) {
          // 복합 자음을 처리
          const combinedConsonant = _isJongJoinable(
            jong.charCodeAt(0),
            char.charCodeAt(0)
          );
          if (combinedConsonant) {
            jong = String.fromCharCode(combinedConsonant) as Jong;
          } else {
            result += combineHangul(cho, jung, jong);
            cho = undefined;
            jung = undefined;
            jong = char as Jong;
          }
        } else {
          jong = char as Jong;
        }
      } else {
        // 중성이 없으면 종성이 아니라 새로운 음절의 초성으로 처리
        result += combineHangul(cho, jung, jong);
        cho = char as Cho;
        jung = undefined;
        jong = undefined;
      }
    } else {
      // 자음도 모음도 아닌 경우 (예: 숫자, 공백 등)
      result += combineHangul(cho, jung, jong);
      result += char;
      cho = undefined;
      jung = undefined;
      jong = undefined;
    }
  }

  if (cho || jung || jong) {
    result += combineHangul(cho, jung, jong);
  }

  return result;
}

// Combine Hangul function to create a complete Hangul character
function combineHangul(cho?: Cho, jung?: Jung, jong?: Jong): string {
  if (!cho || !jung) {
    return cho ?? jung ?? "";
  }

  const choIndex = CHO.indexOf(cho);
  const jungIndex = JUNG.indexOf(jung);
  const jongIndex = jong ? JONG.indexOf(jong) : 0;

  if (choIndex === -1 || jungIndex === -1 || (jong && jongIndex === -1)) {
    return cho + jung + (jong ?? "");
  }

  const code = HANGUL_OFFSET + (choIndex * 21 + jungIndex) * 28 + jongIndex;
  return String.fromCharCode(code);
}

export { disassembleHangul, assembleHangul };
