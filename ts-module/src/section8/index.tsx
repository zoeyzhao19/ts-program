namespace Lesson8 {
  // guang-and-dong -> guangAndDong
  // type UppercaseFirst<Str extends string> =
  //   Str extends `${infer First}${infer Rest}`
  //   ? `${Uppercase<First>}${Rest}`
  //   : never;

  type KebabCaseToCamelCase<Str extends string> = 
    Str extends `${infer First}-${infer Rest}`
      ? `${First}${KebabCaseToCamelCase<Capitalize<Rest>>}`
      : Str

  type KebabCaseToCamelCaseResult = KebabCaseToCamelCase<'Guang-and-dong'>

  // guangAndDong => guang-and-dong
  type CamelCaseToKebabCase<Str extends string > =
    Str extends `${infer First}${infer Rest}`
      ? First extends Capitalize<First>
        ? `-${Uncapitalize<First>}${CamelCaseToKebabCase<Rest>}`
        : `${First}${CamelCaseToKebabCase<Rest>}`
      : Str
  type CamelCaseToKebabCaseResult = CamelCaseToKebabCase<'guangAndDongdXX'>

  type CamelCaseToKebabCase2<Str extends string, isFirstCharacter extends boolean = true > =
    Str extends `${infer First}${infer Rest}`
      ? First extends Capitalize<First>
        ? 
          (
            isFirstCharacter extends true
              ? `${Uncapitalize<First>}${CamelCaseToKebabCase2<Rest, false>}`
              : `-${Uncapitalize<First>}${CamelCaseToKebabCase2<Rest, false>}`
          )
        : `${First}${CamelCaseToKebabCase2<Rest, false>}`
      : Str
  type CamelCaseToKebabCaseResult2 = CamelCaseToKebabCase2<'GuangAndDongdXX'>
  
  // [1,2,3,4,5] => [[1,2] [3,4], [5]]
  type GreaterThan<Num1 extends number, Num2 extends number, Arr extends unknown[] = []> =
            Num1 extends Arr['length']
              ? false
              : Num2 extends Arr['length']
                ? true
                : GreaterThan<Num1, Num2, [...Arr, unknown]>
  type ShiftArr<Arr extends unknown[]> =
        Arr extends [unknown, ...infer Rest]
            ? [...Rest]
            : Arr
  type BatchShiftArr<Arr extends unknown[], Length extends number, TargetArr extends unknown[] = []> =
      GreaterThan<Length, TargetArr['length']> extends true
        ? Arr extends [infer First, ...unknown[]]
            ? BatchShiftArr<ShiftArr<Arr>, Length, [...TargetArr, First]>
            : TargetArr
        : TargetArr
	type FilterArr<Arr1 extends unknown[], Arr2 extends unknown[]> =
					Arr1 extends [...Arr2, ...infer Rest]
						? [...Rest]
						: Arr1
  type ChunkArray<Arr extends unknown[], chunkNum extends number> =
    GreaterThan<Arr['length'], chunkNum> extends true
            ? [BatchShiftArr<Arr, chunkNum>, ...ChunkArray<FilterArr<Arr, BatchShiftArr<Arr, chunkNum>>, chunkNum>]
            : [Arr]
//   type Chunk<
//     Arr extends unknown[], 
//     ItemLen extends number, 
//     CurItem extends unknown[] = [], 
//     Res extends unknown[] = []
// > = Arr extends [infer First, ...infer Rest] ? 
//           CurItem['length'] extends ItemLen ? 
//             Chunk<Rest, ItemLen, [First], [...Res, CurItem]> :
//             Chunk<Rest, ItemLen, [...CurItem, First], Res> 
//     : [...Res, CurItem]
  type ChunkArrayResult =	ChunkArray<[1,2,3,4,5],2>   

  // [‘a’, ‘b’, ‘c’] xxx
  type TupleToNestedObject<Tuple extends unknown[], Value extends any> =
            Tuple extends [infer First, ...infer Rest]
              ? { [Key in First as Key extends keyof any ? Key : never] : TupleToNestedObject<[...Rest], Value>}
              : Value
   type TupleToNestedObjectResult = TupleToNestedObject<['a', 'b', undefined], 1>  
  
   // 将object的某些类型转为可选的
  //  type PartialObjectPropByKeys<Obj extends Record<string, any>, Prop extends keyof Obj> = {
  //   [Key in keyof Obj as Key extends Obj[Prop] ? Key? : Key  ]: Obj[Key]
  //  }
  // 交叉类型&会把同类型做合并，不同类型舍弃
  type Copy<Obj extends Record<string, any>> = {
    [Key in keyof Obj]:Obj[Key]
  }
  type PartialObjectPropByKeys<
      Obj extends Record<string, any>,
      Key extends keyof any
    > = Copy<Partial<Pick<Obj,Extract<keyof Obj, Key>>> & Omit<Obj,Key>>;
  
  type PartialObjectPropByKeysResult = PartialObjectPropByKeys<{
      age: number,
      name: string,
      a: number
    }, 'age' | 'name'>
}