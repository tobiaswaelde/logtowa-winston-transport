import { Socket, io } from 'socket.io-client';
import Transport from 'winston-transport';
import { LogMessage } from './types/log-message';
import { LogTowaTransportError } from './types/error';
import { LogTowaOptions } from './types/options';

/**
 * Winston transport which automatically connects to the LogTowa backend.
 *
 * All logs will be send to the backend.
 */
export class LogTowaTransport extends Transport {
	private client: Socket;

	/**
	 * Creates a new LogTowaTransport instance.
	 * @param {LogTowaOptions} options The options.
	 */
	constructor(private readonly options: LogTowaOptions) {
		super(options);

		this.client = io(options.host, {
			autoConnect: true,
			transports: ['websocket'],
			auth: {
				token: options.token,
				appkey: options.appKey,
			},
		}).on('error', (error) => {
			throw new LogTowaTransportError('Could not connect to the LogTowa backend: ' + error);
		});
	}

	/**
	 * Winston log function
	 * @param {any} info The log info
	 * @param {Function} next The log callback
	 */
	public log(info: any, next: () => void) {
		const msg = this.getLogMessageFromInfo(info);
		this.sendLog(msg, (id) => {});

		next();
	}

	/**
	 * Get the log message to send to the backend.
	 * @param {any} info The log info.
	 * @returns {LogMessage} The log message.
	 */
	private getLogMessageFromInfo(info: any): LogMessage {
		const level = info.level as string;
		const message = info.message as string;
		let scope: string | undefined = undefined;
		let meta: any = undefined;

		// try to extract scope and metadata
		const splat = info[Symbol.for('splat')] as any[];
		if (splat) {
			if (splat.length !== 1) throw new Error('Invalid metadata.');
			const { scope: s, ...metadata } = splat[0];
			scope = s;
			meta = metadata;
		}

		return {
			appKey: this.options.appKey,
			level: level,
			scope: scope,
			message: message,
			meta: meta,
		};
	}

	/**
	 * Send log message to the backend.
	 * @param {LogMessage} message The log message to send.
	 */
	private sendLog(message: LogMessage, cb?: (id: string) => void) {
		this.client.emit('log', message);
	}
}
