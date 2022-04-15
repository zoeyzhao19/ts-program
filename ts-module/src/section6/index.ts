namespace Lesson6 {

  type isAny<T> = 1 extends (2 & T) ? true : false

  type IsUnion<A, B = A> =
    A extends A
        ? [B] extends [A]
            ? false
            : true
        : never

  type IsNever<T> = [T] extends [never] ? true : false

  type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true : false;
  
  type TestAny<T> = T extends number ? 1 : 2;
  type TestAnyResult = TestAny<any>

  // 元组的length是数字字面量 数组的length是number
  // 元组的每个元素都是只读
  // type len = [1,2,3]['length']
  // type len = number[]['length']
  type NotEqual<A, B> = 
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? false : true;
  type IsTuple<T> = T extends readonly [...params: infer Eles]  ? NotEqual<Eles['length'], number> : false

  // 联合转交叉  A | B =》 A & B
  // ts函数参数是有逆变的性质的，也就是如果传入联合类型，会返回交叉类型
  type UnionToIntersection<U> = 
    (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
      ? R 
      : never
  type UnionToIntersection2<U> = 
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
  type UnionToIntersectionResult = UnionToIntersection<{ 'guang': 1} | {'dong': 2}>
  type UnionToIntersectionResult2 = UnionToIntersection2<'guang' | 'dong'> // ???
  // 过滤可选索引
  type GetOptional<Obj extends Record<string, any>> = {
    [ Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never] : Obj[Key]
  }
  type GetOptionalResult = GetOptional<{
    name: string;
    age?: number;
  }>

  type GetRequired<Obj extends Record<string, any>> = {
    [ Key in keyof Obj as {} extends Pick<Obj, Key> ? never : Key] : Obj[Key]
  }
  type GetRequiredResult = GetRequired<{
    name: string;
    age?: number;
  }>

  // 删除索引类型中的可索引签名
  type RemoveIndexSignature<Obj extends Record<string, any>> = {
    [
      Key in keyof Obj as Key extends `${infer Str}` ? Str : never
    ] : Obj[Key]
  }
  type RemoveIndexSignatureResult = RemoveIndexSignature<{
    [key: string]: any;
    sleep(): void
  }>

  // keyof 只能拿到 class 的 public 索引，private 和 protected 的索引会被忽略。
  class Dong {
    public name: string;
    protected age: number;
    private hobbies: string[];
  
    constructor() {
      this.name = 'dong';
      this.age = 20;
      this.hobbies = ['sleep', 'eat'];
    }
  }
  type ClassPublicProps<Obj extends Record<string, any>> = {
    [Key in keyof Obj]: Obj[Key]    
  }
  type ClassPublicPropsResult = ClassPublicProps<Dong>
}

export default Lesson6