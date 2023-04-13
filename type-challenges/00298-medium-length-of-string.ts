import type { Equal, Expect } from '@type-challenges/utils';

// 自己实现
// 思路：转换成数组，取length。
// 技巧：递归
// type LengthOfString<T extends string, U extends string[] = []> = T extends `${infer L}${infer R}`
//   ? R extends string
//     ? LengthOfString<R, [...U, L]>
//     : U['length']
//   : U['length'];

type cases = [
  Expect<Equal<LengthOfString<''>, 0>>,
  Expect<Equal<LengthOfString<'kumiko'>, 6>>,
  Expect<Equal<LengthOfString<'reina'>, 5>>,
  Expect<Equal<LengthOfString<'Sound! Euphonium'>, 16>>
];

// 其他参考实现：
// https://github.com/type-challenges/type-challenges/issues/12995
// https://github.com/type-challenges/type-challenges/issues/4275
// https://github.com/type-challenges/type-challenges/issues/359 一个infer就能实现！
// 转换成string元组
// type LengthOfString<S extends string, T extends string[] = []> = S extends `${string}${infer R}`
//   ? LengthOfString<R, [...T, string]>
//   : T['length'];

type l = LengthOfString<'reina'>; // [string, string, string, string, string]
type LengthOfString<S extends string, T extends unknown[] = []> = S extends `${string}${infer R}`
  ? LengthOfString<R, [...T, 1]>
  : T['length'];

type XX<S extends string> = S extends `${string}${infer R}` ? [R, string] : S;
type a = XX<'abc'>; // ["bc", string]
type YY<S extends string> = S extends `${infer R}${string}` ? [R, string] : S;
type b = YY<'abc'>; // ["a", string]

export {};
