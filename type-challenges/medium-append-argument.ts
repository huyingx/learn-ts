/**
 * 题目：https://github.com/type-challenges/type-challenges/blob/main/questions/00191-medium-append-argument/README.md
 *
 *
 * 思路：
 * 1.函数类型推断
 */

import type { Equal, Expect } from '@type-challenges/utils';

type AppendArgument<T extends (...args: any[]) => void, P extends unknown> = T extends (
  ...args: infer Arg
) => infer R
  ? (...args: [...Arg, P]) => R
  : T;

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>
];

export {};
