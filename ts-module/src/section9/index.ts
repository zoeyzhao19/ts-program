/**
 * 联合转元组
 */
type UnionToIntersection<U> =
  (U extends U ? (x: U) => unknown : never) extends (x: infer R) => unknown
    ? R : never

type UnionToFuncIntersection<T> = UnionToIntersection<T extends any ? () => T : never>;

type UnionToFuncIntersectionRes = UnionToFuncIntersection<'guang' | 'dong'>
type ReturnRes = ReturnType<UnionToFuncIntersectionRes> 

type UnionToTuple<T> = 
  UnionToIntersection<T extends any ? () => T : never> extends () => infer ReturnType
    ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
    : [];

/**
 * join
 */
type JoinType<
    Items extends any[],
    Delimiter extends string,
    Result extends string = ''
> = Items extends [infer Cur, ...infer Rest]
        ? JoinType<Rest, Delimiter, `${Result}${Delimiter}${Cur & string}`>
        : RemoveFirstDelimiter<Result>;

type RemoveFirstDelimiter<Str extends string> = Str extends `${infer _}${infer Rest}` 
            ? Rest
            : Str;

type JoinType2<Items extends unknown[], Delimiter extends string> =
  Items extends [infer First, ...infer Rest]
    ? Rest['length'] extends 1
      ? `${First & string}${Delimiter}${Rest[0] & string}`
      : `${First & string}${Delimiter}${JoinType<Rest, Delimiter>}`
    : ''
type xx = JoinType<['guang', 'and', 'dong'], '-'>

// declare function join<
//     Delimiter extends string
// >(delimiter: Delimiter):
//     <Items extends string[]>
//         (...parts: Items) => JoinType<Items, Delimiter>;

function join<Delimiter extends string>(delimiter: Delimiter): <Items extends string[]>(...parts: Items) => JoinType<Items, Delimiter> {
  let a = '' as any
  return a
}
let b = join('-')('guang', 'and', 'dong')

/**
 * DeepCamelize
 */
type CamelizeArr<Arr> = Arr extends [infer First, ...infer Rest]
    ? [DeepCamelize<First>, ...CamelizeArr<Rest>]
    : []
type DeepCamelize<Obj extends Record<string, any>> =  
  Obj extends unknown[]
    ? CamelizeArr<Obj>
      : {
          [Key in keyof Obj as Key extends `${infer Prefix}_${infer Suffix}` ? `${Prefix}${Capitalize<Suffix>}` : Key]:
            DeepCamelize<Obj[Key]>
        }
type DeepCamelizeRes = DeepCamelize<{
  aaa_bbb: string;
  bbb_ccc: [
      {
          ccc_ddd: string;
      },
      {
          ddd_eee: string;
          eee_fff: {
              fff_ggg: string;
          }
      }
  ]
}>

//Defaultize
type Defaultize<A, B> = 
    & Pick<A, Exclude<keyof A, keyof B>> // 提取aaa
    & Partial<Pick<A, Extract<keyof A, keyof B>>> // 提取bbb
    & Partial<Pick<B, Exclude<keyof B, keyof A>>> // 提取ccc
type Copy<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key]
}

type CpoyRes = Copy<Defaultize<{
  aaa: 111,
  bbb: 222
}, {
  bbb: 222,
  ccc: 333
}>>

export {} 