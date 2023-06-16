/**
 * 题目：https://github.com/type-challenges/type-challenges/blob/main/questions/00119-medium-replaceall/README.md
 *
 *
 * 思路：
 * 1. 类型递归
 */

// 参考实现：
import type { Equal, Expect } from '@type-challenges/utils';

type NonEmptyStr<S extends string> = S extends '' ? never : S;

type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer L}${NonEmptyStr<From>}${infer R}`
  ? `${ReplaceAll<L, From, To>}${To}${ReplaceAll<R, From, To>}`
  : S;

type r = ReplaceAll<'foobar', 'bar', 'foo'>;

type cases = [
  Expect<Equal<ReplaceAll<'foobar', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobar', 'bag', 'foo'>, 'foobar'>>,
  Expect<Equal<ReplaceAll<'foobarbar', 'bar', 'foo'>, 'foofoofoo'>>,
  Expect<Equal<ReplaceAll<'t y p e s', ' ', ''>, 'types'>>,
  Expect<Equal<ReplaceAll<'foobarbar', '', 'foo'>, 'foobarbar'>>,
  Expect<Equal<ReplaceAll<'barfoo', 'bar', 'foo'>, 'foofoo'>>,
  Expect<Equal<ReplaceAll<'foobarfoobar', 'ob', 'b'>, 'fobarfobar'>>,
  Expect<Equal<ReplaceAll<'foboorfoboar', 'bo', 'b'>, 'foborfobar'>>,
  Expect<Equal<ReplaceAll<'', '', ''>, ''>>
];

export {};
