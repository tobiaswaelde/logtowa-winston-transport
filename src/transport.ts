import { Socket, io } from 'socket.io-client';
import Transport from 'winston-transport';
import { LogMessage } from './types/log-message';
import { CloudLoggerTransportError } from './types/error';
import { CloudLoggerOptions } from './types/options';

/**
 * Winston transport which automatically connects to the CloudLogger backend.
 *
 * All logs will be send to the backend.
 */
export class CloudLoggerTransport extends Transport {
	private client: Socket;

	/**
	 * Creates a new CloudLoggerTransport instance.
	 * @param {CloudLoggerOptions} options The options.
	 */
	constructor(private readonly options: CloudLoggerOptions) {
		super(options);

		this.client = io(options.host, {
			autoConnect: true,
			transports: ['websocket'],
			auth: {
				token: options.token,
				projectkey: options.projectKey,
			},
		}).on('error', (error) => {
			throw new CloudLoggerTransportError('Could not connect to the CloudLogger backend: ' + error);
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
			projectKey: this.options.projectKey,
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
