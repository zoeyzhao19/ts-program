namespace Lesson5 {
  type UnionStr = 'a' | 'b' | 'c';
  type UppercaseA<Item extends string> = 
    Item extends 'a' ?  Uppercase<Item> : Item;
  type UppercaseAResult = UppercaseA<UnionStr>

  // 联合类型 Camelcase
  type Camelcase<Str extends string> = 
    Str extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${Camelcase<Rest>}`
    : Str;
  type CamelcaseUnion<Item extends string> =
    Item extends `${infer left}_${infer Right}${infer Rest}`
      ? `${left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
      : Item
  type CamelcaseUnionResult = CamelcaseUnion<'aa_aa_aa' | 'bb_bb_bb' | 'cc_cc_cc'>

  // 判断联合类型
  // 条件类型  extends ? : 中如果左边的类型是联合类型，会把每个元素单独传入做计算，而右边不会
  // A extends A 这种写法是为了触发分布式条件类型，让每个类型单独传入处理的，没别的意义
  type IsUnion<A, B = A> = 
    A extends A
      ? [B] extends [A]
        ? false
        : true
      : never
  type IsUnionResult = IsUnion<'a' | 'b' | 'c' |'d'>
  type IsUnionResult2 = IsUnion<['a' | 'b' | 'c' |'d']>

  // type Union = ['aaa', 'bbb'][number]
  // guang ['aaa', 'bbb'] ['warning', 'success']
  // guang__aaa--warning
  type Bem<Block extends string, Element extends string[], Modifier extends string[]> = 
    `${Block}__${Element[number]}--${Modifier[number]}`
    type BemResult = Bem<'guang', ['aaa', 'bbb'], ['warning', 'success']>
  
  type Combinations<A extends string, B extends string> =
    A | B | `${A}${B}` | `${B}${A}`
  type AllCombinations<A extends string, B extends string = A> =
    A extends A
      ? Combinations<A, Exclude<B, A>>
      : never
  type AllCombinationsResult = AllCombinations<'A' | 'B' | 'C'>
}

export default Lesson5