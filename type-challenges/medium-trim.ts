/**
 * 题目：https://github.com/type-challenges/type-challenges/blob/main/questions/00108-medium-trim/README.md
 *
 *
 * 思路：
 * 1. 类型递归，模板字符
 */

import type { Equal, Expect } from '@type-challenges/utils';

type Whitespace = ' ' | '\n' | '\t';

type TrimLeft<S extends string> = S extends `${Whitespace}${infer R}` ? TrimLeft<R> : S;
type TrimRight<S extends string> = S extends `${infer L}${Whitespace}` ? TrimRight<L> : S;
type Trim<S extends string> = TrimRight<TrimLeft<S>>;

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>
];

export {};
