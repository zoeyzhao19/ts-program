import { parseQueryString } from 'ts-module'

let res = parseQueryString('a=1&b=2&c=3')
console.log(res)