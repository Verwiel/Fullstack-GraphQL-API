import { Query } from './Query'
import { Subscription } from './Subscription'
import { auth } from './Mutation/auth'
import { post } from './Mutation/post'
import { photo } from './Mutation/photo'
import { User } from './User'
import { Post } from './Post'
import { Picture } from './Picture'

export default {
  Query,
  Mutation: {
    ...auth,
    ...post,
    ...photo
  },
  Subscription,
  User,
  Post,
  Picture
}
