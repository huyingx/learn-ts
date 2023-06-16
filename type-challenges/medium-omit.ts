import type { Equal, Expect } from '@type-challenges/utils';

// type MyOmit<T extends {}, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

// 参考实现：
// https://github.com/type-challenges/type-challenges/issues/448  使用as子句

type MyOmit<T extends {}, U extends keyof T> = {
  // 使用as子句对key进行重新映射
  [K in keyof T as K extends U ? never : K]: T[K];
};

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>
];

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}
