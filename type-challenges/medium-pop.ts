/**
 * 题目：
 * https://github.com/type-challenges/type-challenges/blob/main/questions/00016-medium-pop/README.md
 *
 * 思路：
 * 1. infer rest
 */

type Pop<T extends unknown[]> = T extends [...infer Rest, infer L] ? Rest : T;

// 参考实现：
// https://github.com/type-challenges/type-challenges/issues/37
// type Pop<T extends unknown[]> = T extends [...infer U, unknown] ? U : never; // 返回 never case3有问题

import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd']>, ['a', 'b', 'c']>>,
  Expect<Equal<Pop<[]>, []>>
];
