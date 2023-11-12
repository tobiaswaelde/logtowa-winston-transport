import { TransportStreamOptions } from 'winston-transport';

/**
 * The options to configure the LogTowa transport.
 */
export type LogTowaOptions = TransportStreamOptions & {
	/**
	 * The URL to the LogTowa backend.
	 */
	host: string;

	/**
	 * The API token.
	 */
	token: string;

	/**
	 * The project key of the project to which the logger should send the logs.
	 */
	appKey: string;
};
