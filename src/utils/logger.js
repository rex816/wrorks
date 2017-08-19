import winston from 'winston';
import path from 'path';
import fs from 'fs';
import moment from 'moment';
import { isNotRaiseException } from '../db/index';
import { version } from '../../package.json';

const DEV = process.env.NODE_ENV !== 'production';

const LOGS_DIR_PATH = path.join(__dirname, '../../logs');

if (!fs.existsSync(LOGS_DIR_PATH)) {
  fs.mkdirSync(LOGS_DIR_PATH);
}

/* eslint-disable prefer-template */
function formatter(options) {
  const time = options.timestamp();
  const level = options.level.toUpperCase();
  const message = options.message || '';
  let meta = '';
  if (options.meta) {
    if (options.meta.stack) {
      if (isNotRaiseException(options.meta)) {
        meta += '\n  ' + options.meta.stack;
      }
      delete options.meta.stack;
    }
    if (Object.keys(options.meta).length) {
      meta += '\n  ' + JSON.stringify(options.meta);
    }
  }
  return `[${time} ${level} v${version}] ${message}${meta}`;
}

function timestamp() {
  return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

const transports = [
  new winston.transports.File({
    filename: path.join(LOGS_DIR_PATH, DEV ? 'dev.log' : 'prod.log'),
    json: false,
    maxsize: 1024 * 1024 * 3,
    timestamp,
    formatter,
  }),
];
if (DEV) {
  transports.push(
    new winston.transports.Console({
      json: false,
      timestamp,
      formatter,
    }),
  );
}

const level = DEV ? 'debug' : 'error';

const logger = new winston.Logger({ level, transports });

export default logger;
