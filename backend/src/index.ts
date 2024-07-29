import express, { Express } from 'express'
import dotenv from 'dotenv'
import { connectToDatabase } from './db/connection';
import mainRouter from './routes';

dotenv.config()

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

connectToDatabase();

app.use('/api/v1', mainRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})