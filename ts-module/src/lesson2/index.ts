// 元组类型相关
type Tuple = [1,2,3];
// 元组类型末尾追加元素
type PushTuple<Arr extends unknown[], Ele> = Ele extends unknown[] ? [...Arr, ...Ele] : [...Arr,Ele]
type PushTupleResult = PushTuple<[1,2,3,4], [5, 6]>

// 袁旭类型前面添加元素
type UnshiftTuple<Arr extends unknown[], Ele> = Ele extends unknown[] ? [...Ele, ...Arr] : [Ele, ...Arr]
type UnshiftTupleResult = PushTuple<[1,2,3,4], 0>

// 元组合并
type tuple1 = [1,2];
type tuple2 = ['guang', 'dong'];
type tuple = [[1, 'guang'], [2, 'dong']];
type UnionTuple<One extends unknown[], Other extends unknown[]> = One extends [infer OneFirst, ...infer OneRest] ? 
    Other extends [infer OtherFirst, ...infer OtherRest] ? [[OneFirst, OtherFirst], ...UnionTuple<OneRest, OtherRest>] : [] : []
type UnionTupleResult = UnionTuple<[1,2,3,4,5], ['a', 'b', 'c', 'd', 'e']>

//字符串类型的提取和重新构造
type CapitalizeStr<Str extends string> = Str extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : Str
type CapitalizeStrResult = CapitalizeStr<'hahahahah'>

type CamelCase<Str extends string> = Str extends `${infer Left}_${infer Right}${infer Rest}` ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}` : Str
type CamelCaseResult = CamelCase<'dong_dong_dong'>

type DropSubStr<Str extends string, Substr extends string> = Str extends `${infer Prefx}${Substr}${infer Suffix}` ? DropSubStr<`${Prefx}${Suffix}`, Substr> : Str
type DropSubStrResult = DropSubStr<'Today is Monday', 'o'>

// 函数类型重新构造
type AppendArgument<Func extends Function, Arg> = Func extends (...args: infer Args) => infer ReturnType ? (...args: [...Args, Arg]) => ReturnType : never
type AppendArgumentResult = AppendArgument<(name: string) => boolean, number>

/**
 * 索引类型重新构造
 */

// 修改value
type Mapping<Obj extends object> = {
  [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]]
}
type MappingResult = Mapping<{a: 1, b: 2}>

// key大写
type UppercaseKey<Obj extends Record<string, any>> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key]
}
type UppercaseKeyResulet = UppercaseKey<{guang: 1, dong: 2}>

// 只读
type ToReadonly<T> =  {
  readonly [Key in keyof T]: T[Key];
}
type ToReadonlyResult = ToReadonly<{name: string; age: number}>

// 可选
type ToPartial<T> = {
  [Key in keyof T]?: T[Key]
}
type ToPartialResult = ToPartial<{name: string; age: number}>

// 移除只读
type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key]
}
type ToMutableResult = ToMutable<{readonly name: string; age: number}>

// 去掉可选修饰符
type ToRequired<T> = {
  [Key in keyof T]-?: T[Key]
}
type ToRequiredResult = ToRequired<{name?: string; age: number}>

// 根据值类型做过滤
interface Person {
  name: string;
  age: number;
  hobby: string[];
}
type FilterByValueType<Obj extends object, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key]
}
type FilterByValueTypeResult = FilterByValueType<Person, string | number>
/**
 * end 索引类型重新构造
 */

export {}