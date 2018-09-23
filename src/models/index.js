import {
    Pool
} from 'pg';
import url from 'url';
import config from '../config';

let connectionPool = null;
if (process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');
    connectionPool = new Pool({
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1]
    });
} else {
    connectionPool = new Pool(config.development.POOL);
}

export default async (q, data = []) => {
    let res = null;
    const client = await connectionPool.connect();
    try {
        res = await client.query(q, data);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
    return res.rows[0];
}