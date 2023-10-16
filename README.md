# CloudLogger Winston Transport
This package provides a transport constructor to connect to the [CloudLogger]() backend.

[CloudLogger]() is a simple self hosted service which helps you keeping track of your logs in a simple and clear web UI.

## Installation
### Yarn
```sh
yarn add cloud-logger-winston-transport
```
### NPM
```sh
npm install cloud-logger-winston-transport
```

## Usage
The constructor of the transports needs to know how to connect to the backend. This information includes the backend URL, your API token and the project key.

```ts
import { CloudLoggerTransport } from 'cloud-logger-winston-transport';
import winston from 'winston'

// This information can be found in the web UI
const HOST = 'https://your-api-endpoint';
const API_TOKEN = 'your-api-token';
const PROJECT_KEY = 'project-key';

// create the transport
const cloudLoggerTransport = new CloudLoggerTransport({
  host: HOST,
  token: API_TOKEN,
  projectKey: PROJECT_KEY,
});

// create the logger
const logger = winston.createLogger({
	transports: [ cloudLoggerTransport ],
});
```

There are several ways how you can log a message. You can add metadata which provides more information about the log. You can also add a scope (e.g. "db" for all database related logs, "auth" for all authentication related logs). The scope allows you to easily filter the logs in the web UI.

### Basic Log Message
```ts
logger.info('Hello world.');
```

### Log Message with metadata
```ts
logger.info('User signed in.', { name: 'Tobias', age: 24 });
```

### Log Message with scope
```ts
logger.info('Initialization successful.', { scope: 'db' });
```

### Log Message with metadata & scope 
```ts
logger.info('User signed in.', { scope: 'auth', name: 'Tobias', age: 24 });
```