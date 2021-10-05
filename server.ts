import { schema, resolvers } from './src/schema/conta_corrente';
import scriptDb from './script_db';
import dotenv from "dotenv";
import express from 'express';
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose';
import path from 'path';

class App {
  express: any;

  constructor() {
    this.express = express();

    dotenv.config({ path: path.join(__dirname, '.env') });

    this.database();
    this.graphql();

    scriptDb()

    this.express = this.express.listen(process.env.APP_PORT, () =>
      console.log(`Aplicação está rodando na porta ${process.env.APP_PORT}`)
    );
  }

  database() {
    mongoose.connect(`mongodb://${process.env.MONGO_HOST}:27017/graphql`);
  }

  graphql () {
    this.express.use('/', graphqlHTTP({
      schema,
      rootValue: resolvers,
      graphiql: true,
    }));
  }
}

export default new App().express;
