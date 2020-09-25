import serverless from 'serverless-http';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ApolloServer as ApolloServerExpress} from 'apollo-server-express';
import { ApolloServer } from 'apollo-server-lambda'


import { schema } from './src/schema'
import { createContext } from './src/context'


const app = express();
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.get('/message', (_req: Request, res: Response) => {
  res.send({ message: 'This is message route' });
});

// const apolloServer = new ApolloServerExpress({ schema, context: createContext });
// apolloServer.applyMiddleware({app})

app.use((_req: Request, res: Response) => {
  res.send({ message: 'Server is running' });
});

export const index = serverless(app);

export const graphql = (new ApolloServer({ schema, context: createContext })).createHandler()
