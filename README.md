# LogTowa Winston Transport

<!-- #region badges -->
[![Quality Gate Status](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I&metric=alert_status&token=sqb_535123a55d6922bb41e632e468b711314b35d254)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I)
[![Maintainability Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I&metric=sqale_rating&token=sqb_535123a55d6922bb41e632e468b711314b35d254)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I)
[![Security Rating](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I&metric=security_rating&token=sqb_535123a55d6922bb41e632e468b711314b35d254)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I)
[![Vulnerabilities](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I&metric=vulnerabilities&token=sqb_535123a55d6922bb41e632e468b711314b35d254)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I)
[![Bugs](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I&metric=bugs&token=sqb_535123a55d6922bb41e632e468b711314b35d254)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I)
[![Duplicated Lines (%)](https://sq.srv.tobiaswaelde.com/api/project_badges/measure?project=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I&metric=duplicated_lines_density&token=sqb_535123a55d6922bb41e632e468b711314b35d254)](https://sq.srv.tobiaswaelde.com/dashboard?id=tobiaswaelde_cloud-logger-transport_AYs2E0L3PhYnLbS8eM8I)
<!-- #endregion -->

> [!WARNING]  
> This project is still in development. It will be usable as soon as it reaches v1.x

This package provides a transport constructor to connect to the [LogTowa]() backend.

[LogTowa](https://github.com/tobiaswaelde/logtowa-app) is a simple self hosted service which helps you keeping track of your logs in a simple and clear web UI.

## Installation
### Yarn
```sh
yarn add logtowa-winston-transport
```
### NPM
```sh
npm install logtowa-winston-transport
```

## Usage
The constructor of the transports needs to know how to connect to the backend. This information includes the backend URL, your API token and the project key.

```ts
import { LogTowaTransport } from 'logtowa-winston-transport';
import winston from 'winston'

// This information can be found in the web UI
const HOST = 'https://your-api-endpoint';
const API_TOKEN = 'your-api-token';
const APP_KEY = 'app-key';

// create the transport
const logtowaTransport = new LogTowaTransport({
  host: HOST,
  token: API_TOKEN,
  appKey: APP_KEY,
});

// create the logger
const logger = winston.createLogger({
  transports: [ logtowaTransport ],
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