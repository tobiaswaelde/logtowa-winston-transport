import * as winston from 'winston';
import { noUndefined } from './util/no-undefined';
import { LogTowaOptions } from './types/options';
import { LogTowaTransport } from './transport';

type LogLevel = 'error' | 'warning' | 'info' | 'success' | 'http' | 'verbose' | 'debug' | 'silly';

type Options = {
	level?: LogLevel;
	levels?: winston.config.AbstractConfigSetLevels;
	console?: {
		enabled?: boolean;
		level?: LogLevel;
		color?: boolean;
		timestamps?: boolean;
		format?: winston.Logform.Format;
	};
	cloud?: LogTowaOptions & {
		enabled?: boolean;
	};
	transports?: winston.transport[];
};

export const createLogger = (options: Options = {}) => {
	const levels: winston.config.AbstractConfigSetLevels = options.levels ?? {
		error: 0,
		warning: 1,
		info: 2,
		success: 3,
		http: 4,
		verbose: 5,
		debug: 6,
		silly: 7,
	};

	const logger = winston.createLogger({
		level: options.level ?? 'info',
		levels: levels,
	});

	if (options.console?.enabled) {
		const consoleTransport = new winston.transports.Console({
			level: options.console.level,
			format:
				options.console.format ??
				winston.format.combine(
					...noUndefined([
						options.console.color !== false ? winston.format.colorize() : undefined,
						options.console.timestamps !== false ? winston.format.timestamp() : undefined,
						winston.format.label(),
					])
				),
		});
		logger.add(consoleTransport);
	}

	if (options.cloud?.enabled) {
		const cloudTransport = new LogTowaTransport({
			host: options.cloud.host,
			token: options.cloud.token,
			appKey: options.cloud.appKey,
		});
		logger.add(cloudTransport);
	}
};
