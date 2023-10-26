import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { hello, users, user, posts, post } from './queries.js'
import { registerUser, login, createPost, updatePost, deletePost } from './mutations.js'

const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: 'The root query type',
  fields: {
    hello,
    users,
    user,
    posts,
    post,
  }
})

const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "The root mutation type",
  fields: {
    registerUser,
    login,
    createPost,
    updatePost,
    deletePost
  }
})

const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})

export default schema