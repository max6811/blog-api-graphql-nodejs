import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { hello, users, user, posts } from './queries.js'
import { registerUser, login, createPost } from './mutations.js'

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: 'The root query type',
  fields: {
    hello,
    users,
    user,
    posts,
  }
})

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    registerUser,
    login,
    createPost
  }
})

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})

export default schema