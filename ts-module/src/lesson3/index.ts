namespace Lesson3 {
  
  // 提取不确定层数的 Promise 中的 value 类型
  type DeepPromiseValueType<T> =
  T extends Promise<infer ValueType> ? 
    DeepPromiseValueType<ValueType>
      : T
  type DeepPromiseValueTypeResult = DeepPromiseValueType<Promise<Promise<Promise<Record<string, any>>>>>

  /**
  * 数组
  */
  type IsEqual<A, B> = (A extends B ? true : false) & (B extends A ? true : false);

  //数组reverse
  type ReverseArr<Arr extends unknown[]> = Arr extends [...infer Rest, infer Last] ? [Last, ...ReverseArr<Rest>] : Arr
  type ReverseArrResult = ReverseArr<[1,2,3,4,5]>

  //数组查找元素
  type Includes<Arr extends unknown[], FindItem> = Arr extends [infer First, ...infer Rest] 
  ? IsEqual<First, FindItem> extends true
    ? true 
    : Includes<Rest, FindItem>
  : false
  type IncludesResult = Includes<[1,2,3,4,5], 6>

  // 数组移除元素
  type RemoveItem<Arr extends unknown[], Item> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? RemoveItem<Rest, Item>
    : [First, ...RemoveItem<Rest, Item>]
  : Arr
  type RemoveItemResult = RemoveItem<[1,2,2,3], 2>

  // 构造长度数组
  type BuildArray<Length extends number, Arr extends unknown[] = []> = Arr['length'] extends Length
  ? Arr
  : BuildArray<Length, [...Arr, unknown]>
  type BuildArayResult = BuildArray<5>

  /**
  * end 数组
  */

  // 字符串替换
  type ReplaceAllStr<Str extends string, Substr extends string, ReplaceStr extends string> = Str extends `${infer Prefix}${Substr}${infer Suffix}`
  ? ReplaceAllStr<`${Prefix}${ReplaceStr}${Suffix}`, Substr, ReplaceStr>
  : Str
  type ReplaceAllStr2<Str extends string, Substr extends string, ReplaceStr extends string> = Str extends `${infer Left}${Substr}${infer Right}`
  ? `${Left}${ReplaceStr}${ReplaceAllStr2<Right, Substr, ReplaceStr>}`
  : Str
  type ReplaceAllStrResult = ReplaceAllStr<'guang guang guang', 'guang', 'dong'>

  type StringToUnion<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? First | StringToUnion<Rest>
  : never
  type StringToUnionResult = StringToUnion<'hello'>

  // 字符串反转
  type ReverseStr<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? `${ReverseStr<Rest>}${First}`
  : Str
  type ReverseStrResult = ReverseStr<'hello'>

  // 索引类型递归
  type DeepReadonly<Obj extends Record<string, any>> = {
  readonly[Key in keyof Obj]: 
    Obj[Key] extends object
      ? Obj[Key] extends Function
        ? Obj[Key]
        : DeepReadonly<Obj[Key]>
      : Obj[Key]
  }
  type obj = {
  a: {
      b: {
          c: {
              f: () => 'dong',
              d: {
                  e: {
                      guang: string
                  }
              }
          }
      }
  }
  }

  type DeepReadonlyResult = DeepReadonly<obj>['a']
  type DeepReadonlyResult2 = DeepReadonly<obj>['a']['b']['c'];
}

export default Lesson3