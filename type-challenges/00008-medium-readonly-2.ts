import type { Alike, Expect } from '@type-challenges/utils';

// 注意，可以不传参数，给一个默认所有key都设置成只读的
type MyReadonly2<T extends {}, U extends keyof T = keyof T> = Omit<T, U> & {
  readonly [K in U]: T[K];
};

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'title' | 'description'>, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, 'description'>, Expected>>
];

// @ts-expect-error
type error = MyReadonly2<Todo1, 'title' | 'invalid'>;

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}
