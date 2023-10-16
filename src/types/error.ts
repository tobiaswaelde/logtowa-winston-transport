export class CloudLoggerTransportError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, CloudLoggerTransportError.prototype);
		this.name = 'CloudLoggerTransportError';
	}
}
