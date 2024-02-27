import alias from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import path from 'path';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import { main, module, types } from './package.json';

const projectRootDir = path.resolve(__dirname);

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: main,
        format: 'cjs',
      },
      {
        file: module,
        format: 'esm',
      },
    ],
    plugins: [
      peerDepsExternal(),
      nodeResolve({ extensions: ['.ts', '.tsx'] }),
      alias({
        entries: {
          '@root': path.resolve(projectRootDir, 'src'),
          '@components': path.resolve(projectRootDir, 'src/components'),
          '@utils': path.resolve(projectRootDir, 'src/utils'),
          '@constants': path.resolve(projectRootDir, 'src/constants'),
          '@services': path.resolve(projectRootDir, 'src/services'),
          '@assets': path.resolve(projectRootDir, 'src/assets'),
        },
      }),
      url(),
      svgr(),
      babel({
        babelHelpers: 'bundled',
        configFile: './.babelrc.json',
      }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: ['react', 'react-dom', 'styled-components'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: types, format: 'es' }],
    plugins: [dts.default()],
  },
];
