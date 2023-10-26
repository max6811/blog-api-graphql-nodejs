import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql'
import { Schema } from 'mongoose'
import { User } from '../models/index.js'

export const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "Type for User",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
  }
})

export const PostType = new GraphQLObjectType({
  name: "PostType",
  description: "Type for Post",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: UserType,
      resolve(parent) {
        return User.findById(parent.authorId)
      }
    },
  }
})
