import { TransportStreamOptions } from 'winston-transport';

/**
 * The options to configure the CloudLogger transport.
 */
export type CloudLoggerOptions = TransportStreamOptions & {
	/**
	 * The URL to the CloudLogger backend.
	 */
	host: string;

	/**
	 * The API token.
	 */
	token: string;

	/**
	 * The project key of the project to which the logger should send the logs.
	 */
	projectKey: string;
};
