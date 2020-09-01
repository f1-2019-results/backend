require('dotenv').config();
import { initDb } from './db';
import app from './app';

async function init() {
    await initDb();
    app.listen(process.env.PORT || 3000);
}

init();
