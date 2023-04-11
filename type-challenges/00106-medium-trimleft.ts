/**
 * 题目：https://github.com/type-challenges/type-challenges/blob/main/questions/00106-medium-trimleft/README.md
 *
 *
 * 思路：
 * 1. 类型递归，模板字符串可以使用联合类型
 */

// 参考实现：
// https://github.com/type-challenges/type-challenges/issues/352

import type { Equal, Expect } from '@type-challenges/utils';

type Whitespace = ' ' | '\n' | '\t';

type TrimLeft<S extends string> = S extends `${Whitespace}${infer R}` ? TrimLeft<R> : S;

type cases = [
  Expect<Equal<TrimLeft<'str'>, 'str'>>,
  Expect<Equal<TrimLeft<' str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str'>, 'str'>>,
  Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
  Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
  Expect<Equal<TrimLeft<''>, ''>>,
  Expect<Equal<TrimLeft<' \n\t'>, ''>>
];

export {};
