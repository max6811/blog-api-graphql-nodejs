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

export const updatePost = {
  type: PostType,
  description: "Update a Post",
  args: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve: async (_, { id, title, body }, { verifiedUser }) => {
    if (!verifiedUser) throw new Error("Unauthorized")
    const updatedPost = await Post.findOneAndUpdate(
      { _id: id, authorId: verifiedUser._id },//compara la misma persona que creo
      {
        title,
        body
      },
      {
        new: true,
        runValidators: true,
      }
    )
    return updatedPost
  }
}

export const deletePost = {
  type: PostType,
  description: "Delete a Post",
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, { id }, { verifiedUser }) => {
    if (!verifiedUser) throw new Error("Unauthorized")
    const deletedPost = await Post.findOneAndDelete(
      { _id: id, authorId: verifiedUser._id }
    )
    if(!deletedPost) throw new Error("Post not Found")
    return deletedPost
  }
}