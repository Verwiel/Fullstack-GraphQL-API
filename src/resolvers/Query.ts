import { getUserId, Context } from '../utils'

export const Query = {
  postFeed(parent, args, ctx: Context) {
    return ctx.prisma.posts({ where: { published: true } })
  },

  picFeed(parent, args, ctx: Context) {
    return ctx.prisma.pictures({ where: { published: true } })
  },

  postDrafts(parent, args, ctx: Context) {
    const id = getUserId(ctx)

    const where = {
      published: false,
      author: {
        id,
      },
    }

    return ctx.prisma.posts({ where })
  },

  photoDrafts(parent, args, ctx: Context) {
    const id = getUserId(ctx)

    const where = {
      publishedPhoto: false,
      creator: {
        id,
      },
    }

    return ctx.prisma.pictures({ where })
  },

  me(parent, args, ctx: Context) {
    const id = getUserId(ctx)
    return ctx.prisma.user({ id })
  },
}
