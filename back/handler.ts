import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer as ApolloServerExpress} from 'apollo-server-express';


import { schema } from './src/schema'
import { createContext } from './src/context'


const app = express();
app.use(cors());

const apolloServer = new ApolloServerExpress({ schema, context: createContext });
apolloServer.applyMiddleware({app})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/message', (_req: Request, res: Response) => {
  res.send('This is message route');
});

app.use((_req: Request, res: Response) => {
  res.send('Server is running');
});

export const index = serverless(app);