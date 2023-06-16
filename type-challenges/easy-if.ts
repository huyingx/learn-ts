import type { Equal, Expect } from '@type-challenges/utils';

type If<K extends boolean, T, F> = K extends true ? T : F;

type cases = [Expect<Equal<If<true, 'a', 'b'>, 'a'>>, Expect<Equal<If<false, 'a', 2>, 2>>];

// @ts-expect-error
type error = If<null, 'a', 'b'>;
