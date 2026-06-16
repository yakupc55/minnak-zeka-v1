import { appMeta as randomNumMeta, execute as randomNumExecute } from './apps/random_num.js';
import { appMeta as stringLenMeta, execute as stringLenExecute } from './apps/string_len.js';
import { appMeta as weatherMeta, execute as weatherExecute } from './apps/weather.js';

export const appRegistry = [
  {
    ...randomNumMeta,
    execute: randomNumExecute
  },
  {
    ...stringLenMeta,
    execute: stringLenExecute
  },
  {
    ...weatherMeta,
    execute: weatherExecute
  }
];