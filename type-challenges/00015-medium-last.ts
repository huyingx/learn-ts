/**
 * 题目：
 * https://github.com/type-challenges/type-challenges/blob/main/questions/00015-medium-last/README.md
 *
 * 思路：
 * 1. 方式1：递归
 * 2. 方式2：infer rest
 * 3. 方式3：通过计算length属性获取最后一个元素
 */

// 递归
// type Last<T extends unknown[], U extends unknown = never> = T extends [infer L, ...infer R]
//   ? R extends unknown[]
//     ? Last<R, L>
//     : U
//   : U;

// 参考实现：
// https://github.com/type-challenges/type-challenges/issues/38
// type Last<T extends any[]> = T extends [...infer _, infer L] ? L : never;

// 计算length获取
type Last<T extends unknown[]> = T extends [infer First, ...infer Rest] ? T[Rest['length']] : never;

import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>
];
