import type { Equal, Expect } from '@type-challenges/utils';

// ok
// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K] extends Function ? T[K] : DeepReadonly<T[K]>;
// };

// ok
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends { [key: number]: any } ? DeepReadonly<T[K]> : T[K];
};

// error： 会把函数变成 readonly
// type DeepReadonly<T> = {
//   readonly [K in keyof T]: T[K] extends { [key: string]: any } ? DeepReadonly<T[K]> : T[K];
// };

type A = { a: () => 22; b: 'b' } extends { [key: number]: any } ? 1 : 2; // 1
type A1 = { a: () => 22; 1: true } extends { [key: string]: any } ? 1 : 2; // 1
type B = [() => 22, 'b'] extends { [key: number]: any } ? 1 : 2; // 1
type B1 = [1, true] extends { [key: string]: any } ? 1 : 2; // 1

function aa() {}
// 函数是 { [key: string]: any } 子类型
type C = typeof aa extends { [key: number]: any } ? 1 : 2; // 2
type C1 = typeof aa extends { [key: string]: any } ? 1 : 2; // 1

type C2 = () => 22 extends { [key: number]: any } ? 1 : 2; // 2
type C3 = () => 22 extends { [key: string]: any } ? 1 : 2; // 2

type D = { [x: symbol]: number } extends { [key: number]: any } ? 1 : 2; // 1;
type D1 = { [x: symbol]: number } extends { [key: string]: any } ? 1 : 2; // 1;

// type a = DeepReadonly<X1>;
// type a = {
//   readonly a: () => 22;
//   readonly b: string;
//   readonly c: DeepReadonly<{
//       d: boolean;
//       e: {
//           g: {
//               h: {
//                   i: true;
//                   j: 'string';
//               };
//               k: 'hello';
//           };
//           l: [
//               'hi',
//               {
//                   m: ['hey'];
//               }
//           ];
//       };
//   }>;
// }

// type b = DeepReadonly<{
//   l: [
//     'hi',
//     {
//         m: ['hey'];
//     }
// ];
// }>

// 参考实现：
// https://github.com/type-challenges/type-challenges/issues/52 from vue-next

// type Primitive = string | number | boolean | bigint | symbol | undefined | null;
// type Builtin = Primitive | Function | Date | Error | RegExp;
// type DeepReadonly<T> = T extends Builtin
//   ? T
//   : T extends Map<infer K, infer V>
//   ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
//   : T extends ReadonlyMap<infer K, infer V>
//   ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
//   : T extends WeakMap<infer K, infer V>
//   ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
//   : T extends Set<infer U>
//   ? ReadonlySet<DeepReadonly<U>>
//   : T extends ReadonlySet<infer U>
//   ? ReadonlySet<DeepReadonly<U>>
//   : T extends WeakSet<infer U>
//   ? WeakSet<DeepReadonly<U>>
//   : T extends Promise<infer U>
//   ? Promise<DeepReadonly<U>>
//   : T extends {}
//   ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
//   : Readonly<T>;

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>
];

type X1 = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: 'string';
        };
        k: 'hello';
      };
      l: [
        'hi',
        {
          m: ['hey'];
        }
      ];
    };
  };
};

type X2 = { a: string } | { b: number };

type Expected1 = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: 'string';
        };
        readonly k: 'hello';
      };
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey'];
        }
      ];
    };
  };
};

type Expected2 = { readonly a: string } | { readonly b: number };
