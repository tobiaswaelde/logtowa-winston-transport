export class LogTowaTransportError extends Error {
	constructor(message: string) {
		super(message);
		Object.setPrototypeOf(this, LogTowaTransportError.prototype);
		this.name = 'LogTowaTransportError';
	}
}
