namespace Lesson7 {
  type BuildArray<Length extends number, Arr extends unknown[] = []> = 
    Arr['length'] extends Length
      ? Arr
      : BuildArray<Length, [unknown, ...Arr]>

  type fff<T> = T extends readonly unknown[] | [] ?
    {
      -readonly [P in keyof T]: 1
    } : never
  
    type sfas = fff<[1,2,3]>

  type res = [Promise<1>, Promise<2>, Promise<3>][number]
}

export default Lesson7