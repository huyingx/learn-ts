/**
 * 题目：https://github.com/type-challenges/type-challenges/blob/main/questions/00116-medium-replace/README.md
 *
 *
 * 思路：
 * 1. 模板字符推断，注意空串
 */

import type { Equal, Expect } from '@type-challenges/utils';

type NonEmptyStr<S extends string> = S extends '' ? never : S;

type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${NonEmptyStr<From>}${infer R}` ? `${L}${To}${R}` : S;

type a = Replace<'foobarbar', '', 'foo'>;

type cases = [
  Expect<Equal<Replace<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', 'foo'>, 'foofoobar'>>,
  Expect<Equal<Replace<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'foobarbar', 'bar', ''>, 'foobar'>>,
  Expect<Equal<Replace<'foobarbar', 'bra', 'foo'>, 'foobarbar'>>,
  Expect<Equal<Replace<'', '', ''>, ''>>
];

export {};
