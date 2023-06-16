import type { Alike, Expect } from '@type-challenges/utils';

/**
 * 题目：https://github.com/type-challenges/type-challenges/blob/main/questions/00012-medium-chainable-options/README.md
 *
 * 思路：
 * 1. 返回自己实现链式调用
 * 2. 同样的 key 只会被使用一次。 K extends keyof T ? never : K
 * 3. 支持覆盖类型 Omit<T, K> & Record<K, V>
 */
type Chainable<T extends object = {}> = {
  option<K extends keyof any, V extends unknown>(
    key: K extends keyof T ? never : K,
    value: V
  ): Chainable<Omit<T, K> & Record<K, V>>;
  get(): T;
};

// 参考实现：
// https://github.com/type-challenges/type-challenges/issues/13951
// https://github.com/type-challenges/type-challenges/issues/15337

// https://github.com/type-challenges/type-challenges/issues/18133
// type Chainable<Opts extends Record<string, any> = {}> = {
//   option<K extends string, V>(
//     key: K extends keyof Opts ? (V extends Opts[K] ? never : K) : K,
//     value: V
//   ): Chainable<Omit<Opts, K> & { [Key in K]: V }>;
//   get(): Opts;
// };

declare const a: Chainable;

const result1 = a
  .option('foo', 123)
  .option('bar', { value: 'Hello World' })
  .option('name', 'type-challenges')
  .get();

const result2 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 'last name')
  .get();

const result3 = a
  .option('name', 'another name')
  // @ts-expect-error
  .option('name', 123)
  .get();

type cases = [
  Expect<Alike<typeof result1, Expected1>>,
  Expect<Alike<typeof result2, Expected2>>,
  Expect<Alike<typeof result3, Expected3>>
];

type Expected1 = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};

type Expected2 = {
  name: string;
};

type Expected3 = {
  name: number;
};
