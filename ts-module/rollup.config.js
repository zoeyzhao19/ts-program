import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: {
    file: 'dist/index.js', 
    format: 'cjs',// rollup支持的多种输出格式(有amd,cjs, es, iife 和 umd)
    sourcemap: true
  },

  plugins: [
    typescript(),  // 会自动读取 文件tsconfig.json配置
  ]
}
