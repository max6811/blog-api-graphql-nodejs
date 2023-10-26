import express from 'express'
import bodyParser from 'body-parser'
import { graphqlHTTP } from 'express-graphql'
import schema from './graphql/squema.js'
import connectDB from './db/index.js'
import { authenticate } from './middlewares/auth.js'


connectDB()
const app = express()

app.use(bodyParser.json())

/**
 * create middleware to excecute beafore graphql to
 * control security in routes jwt
 */
app.use(authenticate)

// configuration for graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}))

app.listen(4000)