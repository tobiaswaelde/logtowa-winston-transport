/**
 * Type of log message to send to the backend
 */
export type LogMessage = {
	/** The project key. */
	appKey: string;

	/** The log level. */
	level: string;

	/** The scope. */
	scope?: string;

	/** The message. */
	message: string;

	/** The meta data. */
	meta: object;
};
