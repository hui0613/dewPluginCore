import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import * as path from 'path'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: path.resolve(__dirname, 'lib', 'index.js'),
      format: 'cjs',
      name: pkg.name
    },
    {
      file: path.resolve(__dirname, 'lib', 'index.esm.js'),
      format: "es",
      name: pkg.name
    }
  ],
  plugins: [
    nodeResolve({
      extensions: ['.ts', '.js'],
    }),
    typescript({
      tsconfig: path.resolve(__dirname, 'tsconfig.json')
    }),
    commonjs()
  ]
}