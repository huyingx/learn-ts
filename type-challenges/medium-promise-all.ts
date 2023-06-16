/**
 * 题目：
 * https://github.com/type-challenges/type-challenges/blob/main/questions/00020-medium-promise-all/README.md
 *
 * 参考文章
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types
 * 思路：
 * 1. 元组转换
 * 2. 递归处理Promise
 */

// 参考实现：
// https://github.com/type-challenges/type-challenges/issues/1924
// declare function PromiseAll<T extends readonly any[]>(
//   values: readonly [...T]
// ): Promise<{
//   [P in keyof T]: T[P] extends Promise<infer R> ? R : T[P]; // 需要递归处理Promise
// }>;

// https://github.com/type-challenges/type-challenges/issues/508
type Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T;
declare function PromiseAll<T extends any[]>(
  values: readonly [...T]
): Promise<{
  [P in keyof T]: Awaited<T[P]>;
}>;

import type { Equal, Expect } from '@type-challenges/utils';

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>
];

export {};
