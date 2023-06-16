import type { Equal, Expect } from '@type-challenges/utils';

// https://github.com/type-challenges/type-challenges/issues/1568
// https://github.com/type-challenges/type-challenges/issues/13952

type Equals<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
  ? true
  : false;

// 思路：对比每一项是否相等，转换成对象保存比较结果，最后取对象的value的联合类型
// 包含在其中期望是true，实际value的联合类型是 boolean
// 所以必须使用 false 来判断最终结果，如果是false表示不包含，如果是boolean就是包含
// type Includes<T extends unknown[], U> = {
//   [K in keyof T]: Equals<T[K], U>;
// }[number] extends false
//   ? false
//   : true;

// 递归实现
type Includes<T extends unknown[], U> = T extends [infer Item, ...infer R]
  ? Equals<U, Item> extends true
    ? true
    : Includes<R, U>
  : false;

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>
];
