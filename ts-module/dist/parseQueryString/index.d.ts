declare type MergeValue<One, Other> = One extends Other ? One : Other extends unknown[] ? [One, ...Other] : [One, Other];
declare type MergeParam<Obj1 extends Record<string, any>, Obj2 extends Record<string, any>> = {
    [Key in keyof Obj1 | keyof Obj2]: Key extends keyof Obj1 ? (Key extends keyof Obj2 ? MergeValue<Obj1[Key], Obj2[Key]> : Obj1[Key]) : Key extends keyof Obj2 ? Obj2[Key] : never;
};
declare type ParseParam<Str extends string> = Str extends `${infer Key}=${infer Value}` ? {
    [K in Key]: Value;
} : Record<string, any>;
export declare type ParseQueryString<Str extends string> = Str extends `${infer Param}&${infer Rest}` ? MergeParam<ParseParam<Param>, ParseQueryString<Rest>> : ParseParam<Str>;
export declare function parseQueryString<Str extends string>(queryStr: Str): ParseQueryString<Str>;
export {};
