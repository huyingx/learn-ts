import type { Equal, Expect } from '@type-challenges/utils';

// type TupleToUnion<T extends readonly unknown[]> = T extends (infer R)[] ? R : never;
type TupleToUnion<T extends readonly unknown[]> = T[number];

type cases = [
  Expect<Equal<TupleToUnion<[123, '456', true]>, 123 | '456' | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>
];
