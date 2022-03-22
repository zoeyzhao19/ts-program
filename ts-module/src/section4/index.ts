namespace Lesson4 {
  
  // 数组长度加减乘除
  type BuildArray<Length extends number, Arr extends unknown[] = []> = Arr['length'] extends Length
  ? Arr
  : BuildArray<Length, [...Arr, unknown]>

  // 数组加法
  type AddArray<Num1 extends number, Num2 extends number> =  [...BuildArray<Num1>, ...BuildArray<Num2>]['length']

  type AddArrayResult = AddArray<43,21>

  // 数组减法
  type SubstractArray<Num1 extends number, Num2 extends number> = BuildArray<Num1> extends [...BuildArray<Num2>, ...infer Rest]
    ? Rest['length']
    // : BuildArray<Num2> extends [...BuildArray<Num1>, ...infer Rest]
    //   ? Rest['length']
      : never
  type SubstractArrayResult = SubstractArray<32,13>

  type MutiplyArray<
    Num1 extends number,
    Num2 extends number,
    ResultArr extends unknown[] = []
  > = Num2 extends 0 
        ? ResultArr['length']
        : MutiplyArray<Num1, SubstractArray<Num2, 1>, [...BuildArray<Num1>, ...ResultArr]>;
  type MutiplyArrayResult = MutiplyArray<21, 12>

  type DivideArray<Num1 extends number,
    Num2 extends number,
    ResultArr extends unknown[] = []
  > = Num1 extends 0
    ? ResultArr['length']
    : DivideArray<SubstractArray<Num1, Num2>, Num2, [unknown, ...ResultArr]>
  type DivideArrayResult = DivideArray<9, 3>

  // 数组长度实现计数
  type Strlen<Str extends string, LenResult extends unknown[] = []> = Str extends `${string}${infer Rest}`
    ? Strlen<Rest, [unknown, ...LenResult]>
    : LenResult['length']
  type StrLenResult = Strlen<'Hello World'>

  // 数值比较
  type GreaterThan<Num1 extends number, Num2 extends number, ResultArr extends unknown[] = []> = 
    ResultArr['length'] extends Num1
      ? false
      : ResultArr['length'] extends Num2
        ? true
        : GreaterThan<Num1, Num2, [unknown, ...ResultArr]>
  type GreaterThanResult = GreaterThan<2,3>

  //  菲波那契 求数列第n个数值
  // F(0) = 1，F(1) = 1, F(n) = F(n - 1) + F(n - 2)（n ≥ 2，n ∈ N*）
  // 1 1 2 3 5 8 13 21 34
  type FibonacciLoop<Num extends number, IndexArr extends unknown[] = [], PrevArr extends unknown[] = [], CurrentArr extends unknown[] = []> =
    IndexArr['length'] extends Num
      ? CurrentArr['length']
      : FibonacciLoop<Num, [unknown, ...IndexArr], [...CurrentArr], [...PrevArr, ...CurrentArr]>
  type Fibonacci<Num extends number> = FibonacciLoop<Num, [], [1], []>
  type FibonacciResult = Fibonacci<8>
}

export default Lesson4
