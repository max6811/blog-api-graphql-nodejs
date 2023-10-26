import { GraphQLID, GraphQLString } from "graphql";
import { User, Post } from "../models/index.js";
import { setPassword, validPassword } from '../utils/encryption.js'
import { createTokenJWT } from '../utils/auth.js'
import { UserType, PostType } from './types.js'


export const registerUser = {
  type: UserType,
  description: "Register a new user",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { username, email, password, displayName } = args
    const encryptedPassword = (await setPassword(password));
    const newUser = await User.create({ username, email, password: encryptedPassword, displayName })
    return newUser
  }
}

export const login = {
  type: GraphQLString,
  description: 'Login with email and password',
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const user = await User.findOne({ email: args.email }).select("+password")
    if (!user) throw new Error("Invalid credentials")
    if (!await validPassword(args.password, user.password)) {
      throw new Error("Invalid password")
    }
    return await createTokenJWT({
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
    })
  }
}

export const createPost = {
  type: PostType,
  description: "crate new post",
  args: {
    // authorId: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve: async (_, args, { verifiedUser }) => {
    const { title, body } = args
    const newPost = new Post({
      title,
      body,
      authorId: verifiedUser._id,
    })
    await newPost.save()
    return newPost
  }
}