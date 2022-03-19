type MergeValue<One, Other> = 
    One extends Other 
    ? One
    : Other extends unknown[]
      ? [One, ...Other]
      : [One, Other];

  type MergeParam <Obj1 extends Record<string, any>, Obj2 extends Record<string, any>> = {
    [Key in keyof Obj1 | keyof Obj2]: 
      Key extends keyof Obj1
        ? (Key extends keyof Obj2
          ? MergeValue<Obj1[Key], Obj2[Key]> : Obj1[Key])
        : Key extends keyof Obj2
          ? Obj2[Key]
          : never
  }
  type ParseParam <Str extends string> =
    Str extends `${infer Key}=${infer Value}`
    ? {[K in Key] : Value}
    : Record<string, any> // 用Record<string, any> 替代 {} 因为 ParseQueryString 是针对字符串字面量类型做运算的，如果传入的不是字面量类型，而是 string，那就会走到这里，如果返回空对象，那取res的任何属性都会报错。

  export type ParseQueryString<Str extends string> =
    Str extends `${infer Param}&${infer Rest}`
      ? MergeParam<ParseParam<Param>, ParseQueryString<Rest>>
      : ParseParam<Str>

export function parseQueryString<Str extends string>(queryStr: Str): ParseQueryString<Str> {
  if (!queryStr || !queryStr.length) {
      return {} as any;
  }
  const queryObj = {} as any;
  const items = queryStr.split('&');
  items.forEach(item => {
      const [key, value] = item.split('=');
      if (queryObj[key]) {
          if(Array.isArray(queryObj[key])) {
              queryObj[key].push(value);
          } else {
              queryObj[key] = [queryObj[key], value]
          }
      } else {
          queryObj[key] = value;
      }
  });
  return queryObj as any;
}
