/**
 * 题目：https://github.com/type-challenges/type-challenges/blob/main/questions/05153-medium-indexof/README.md
 *
 *
 * 思路：
 * 1.
 * 2.
 * 3.
 */

// 参考实现：

export {};

/*
  5153 - IndexOf
  -------
  by Pineapple (@Pineapple0919) #medium #array

  ### Question

  Implement the type version of Array.indexOf, indexOf<T, U> takes an Array T, any U and returns the index of the first U in Array T.

  ```ts
  type Res = IndexOf<[1, 2, 3], 2>; // expected to be 1
  type Res1 = IndexOf<[2,6, 3,8,4,1,7, 3,9], 3>; // expected to be 2
  type Res2 = IndexOf<[0, 0, 0], 2>; // expected to be -1
  ```

  > View on GitHub: https://tsch.js.org/5153
*/

/* _____________ Your Code Here _____________ */

type ArrToUnion<T extends any[]> = T extends (infer R)[] ? R : never;

type FindTargetIndex<T extends any[], U, Temp extends any[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? Temp['length']
    : FindTargetIndex<Rest, U, [First, ...Temp]>
  : -1;

type IndexOf<T extends any[], U> = FindTargetIndex<T, U>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils';

type cases = [
  Expect<Equal<IndexOf<[1, 2, 3], 2>, 1>>,
  Expect<Equal<IndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 2>>,
  Expect<Equal<IndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a'], number>, 2>>,
  Expect<Equal<IndexOf<[string, 1, number, 'a', any], any>, 4>>,
  Expect<Equal<IndexOf<[string, 'a'], 'a'>, 1>>,
  Expect<Equal<IndexOf<[any, 1], 1>, 1>>
];
