import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { babel } from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
import path from 'path';

const packageJson = require('./package.json');
const projectRootDir = path.resolve(__dirname);

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
      },
      {
        file: packageJson.module,
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
      babel({
        babelHelpers: 'bundled',
        configFile: '.babelrc.json',
      }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
    ],
    external: ['react', 'react-dom', 'styled-components'],
  },
  {
    input: 'src/index.ts',
    output: [{ file: packageJson.types, format: 'es' }],
    plugins: [dts.default()],
  },
];
