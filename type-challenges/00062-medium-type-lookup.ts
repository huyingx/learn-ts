import type { Equal, Expect } from '@type-challenges/utils';

/**
 * NOTE 复习
 * 题目：https://github.com/type-challenges/type-challenges/blob/main/questions/00062-medium-type-lookup/README.md
 *
 * 思路：
 * 1. 条件分发，鸭子类型
 * 2. 还可以转换成对象，value通过1判断出需要的类型
 */

type LookUp<T extends { type: any }, V> = T extends { type: V } ? T : never;

// 参考实现
// https://github.com/type-challenges/type-challenges/issues/149
// https://github.com/type-challenges/type-challenges/issues/75

// ok
// type LookUp<T, K extends keyof any> = {
//   [P in K]: T extends { type: K } ? T : never;
// }[K];

interface Cat {
  type: 'cat';
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal';
}

interface Dog {
  type: 'dog';
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer';
  color: 'brown' | 'white' | 'black';
}

type Animal = Cat | Dog;

type cases = [Expect<Equal<LookUp<Animal, 'dog'>, Dog>>, Expect<Equal<LookUp<Animal, 'cat'>, Cat>>];

type a = Animal[keyof Animal];
