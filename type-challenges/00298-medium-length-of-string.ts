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
type LengthOfString<S extends string, T extends string[] = []> = S extends `${
  string /* 这里的string还可以当变量用，学到了 */
}${infer R}`
  ? LengthOfString<R, [...T, string]>
  : T['length'];
