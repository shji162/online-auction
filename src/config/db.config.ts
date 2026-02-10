import { PostgresConnectionOptions } from "typeorm/browser/driver/postgres/PostgresConnectionOptions.js";


class dbConfig implements PostgresConnectionOptions {
    type: 'postgres'
    host: 'localhost'
    port: 5432
    username: 'postgres'
    password: '1234'
    database: 'online-auctionDB'
    entities: []
    synchronize: true
}

export default new dbConfig()