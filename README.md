# pino-hana

A [Pino Transport](https://getpino.io/#/docs/transports) to write logs on SAP HANA Database.

# Options

- `connectionOptions` accepts an _object_ of type [Connection Options](#connection-options)
- `schema` accepts a _string_ which is the schema in which tha table logs will be saved in is present
- `table` accepts a _string_ which is the name of the table in which logs will be saved (without the schema)

## Connection Options

Is an object in which the connection options to SAP HANA Database are specified with the following structure:

- `host` accepts a _string_ containing the hana database host
- `port` accepts a _number_ which is the port of the hana database
- `user` accepts a _string_ which indicates the user you want to use to log into hana database
- `password` accepts a _string_ which indicates the password you want to use to log into hana database

# Getting started

Install [pino](https://www.npmjs.com/package/pino) alongside with [pino-hana](https://www.npmjs.com/package/pino-hana) with the following command:

```
npm i pino pino-hana
```

Setup a pino logger in your codebase using the pino-hana transport like shown in the example:

```javascript
const pino = require('pino')
const logger = pino({
  transport: {
    target: 'pino-hana',
    options: {
      connectionOptions: {
        host: <hana db host>,
        port: <hana db port>,
        user: <hana db user>,
        password: <hana db password>,
      },
      schema: <schema of the table in which you want to save the logs>,
      table: <table in which you want to save the logs>,
    },
  },
})

logger.info('hi') // this log will be saved into SAP HANA
```

At this point you are set to use pino-hana and all the logged information are saved to specified table in the options.

_Note_: make sure to provide always _connectionOptions_, _schema_ and _table_ to the options.

`IMPORTANT`: Make sure that the corresponding table and schema is already present in the database. The table must be created with the structure provided with the following create statement:

```sql
CREATE TABLE <schema>.<table>
(
ID NVARCHAR(40) PRIMARY KEY,
MSG NVARCHAR(5000),
CREATEDAT TIMESTAMP,
LEVEL INT
)
```

For a full usage guide please refer to the [official pino documentation](https://getpino.io/#/).
