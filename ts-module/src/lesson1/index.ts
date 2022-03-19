type Tuple = [1,2,3];
type GetValueType<P> = P extends Promise<infer Value> ? Value : never;
type GetValueResult = GetValueType<Promise<'guang'>>;

// 取数组第一个值
type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]] ? First : never
type GetFirstResult = GetFirst<[1]>

// 取数组最后一个值
type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last] ? Last : never;
type GetLastResult = GetLast<[]>

// 去掉了最后一个元素的数组
type PopArr<Arr extends unknown[]> = Arr extends [...infer Rest, unknown] ? Rest : never;
type GetPopArr = PopArr<[1,2,3,4,5]>;

// 去掉了第一个元素的数组
type ShiftArr<Arr extends unknown[]> = Arr extends [unknown, ...infer Rest] ? Rest : never;
type GetShiftArr = ShiftArr<[1]>

// 判断字符串是否以某个前缀开头
type StartsWith<Str extends string, Prefix extends string> = Str extends `${Prefix}${string}` ? true : false;
type GetStartWith = StartsWith<'Today is Monday', 'Today'>

// 字符串替换
type ReplaceWith<Str extends string, From extends string, To extends string> = Str extends `${infer Prefix}${From}${infer Suffix}` ?
    `${Prefix}${To}${Suffix}` : Str
type ReplaceWithResult = ReplaceWith<'We use optional cookies to improve your experience', 'We', 'build'>

//去掉空白字符
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${' ' | '\n' | '\t' }` ? TrimStrRight<Rest> : Str
type TrimStrLeft<Str extends string> = Str extends `${' ' | '\n' | '\t'}${infer Rest}` ? TrimStrLeft<Rest> : Str
type TrimStr<Str extends string> = TrimStrRight<TrimStrLeft<Str>>
type TrimStrResult = TrimStr<'   Today is Monday   '>

//提取函数参数类型
type GetParameters<Func extends Function> = Func extends (...args: infer Args) => unknown ? Args : never
type GetParametersResult = GetParameters<(name: string, age: number) => string>

//提取函数返回值类型
type GetReturnType<Func extends Function> = Func extends (...args: any[]) => infer ReturnType ? ReturnType : never
type GetReturnTypeResult = GetReturnType<(name: string, age: number) => string>

// this指向
class Dong {
    hello(this: Dong) {}
}
const dong = new Dong();
type GetThisParameterType<T> = T extends (this: infer ThisType, ...args: any[]) => any ? ThisType : unknown
type GetThisParameterTypeResult = GetThisParameterType<typeof dong.hello>

//构造器
interface Person {
    name: string;
}
interface PersonConstructor {
    new(name: string): Person;
}
//取出构造器对应的实例类型
type GetInstanceType<ConstructorType extends new(...args: any[]) => any> = ConstructorType extends new(...args: any[]) => infer InstanceType ? InstanceType : any
type GetInstanceTypeResult = GetInstanceType<PersonConstructor>;
//取出构造器参数
type GetConstructorParameters<ConstructorType extends new(...args: any[]) => any> = ConstructorType extends new(...args: infer ConstructorParameters) => any ? ConstructorParameters : any
type GetConstructorParametersResult = GetConstructorParameters<PersonConstructor>;

// export {}