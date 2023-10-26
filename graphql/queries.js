import { GraphQLID, GraphQLList, GraphQLString } from 'graphql'
import { Post, User } from "../models/index.js";
import { PostType, UserType } from './types.js'

export const hello = {
  type: GraphQLString,
  description: 'return a string',
  resolve: () => 'hello world!'
}

export const users = {
  type: new GraphQLList(UserType),
  description: 'get a user list',
  resolve() {
    return User.find();
  }
}

export const user = {
  type: UserType,
  description: 'get a user by id',
  args: {
    id: { type: GraphQLID }
  },
  resolve(_, args) {
    return User.findById(args.id);
  }
}

export const posts = {
  type: new GraphQLList(PostType),
  description: "Get All Posts",
  resolve: () => Post.find()
}