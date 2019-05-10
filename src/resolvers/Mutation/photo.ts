import { getUserId, Context } from '../../utils'

export const photo = {
  async addPhoto(parent, { date, location, title, caption, url }, ctx: Context, info) {
    const userId = getUserId(ctx)
    return ctx.prisma.createPicture({
      date,
      location,
      title,
      caption,
      url,
      creator: {
        connect: { id: userId },
      },
    })
  },

  async publishPhoto(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx)
    const photoExists = await ctx.prisma.$exists.picture({
      id,
      creator: { id: userId },
    })
    if (!photoExists) {
      throw new Error(`Post not found or you're not the author`)
    }

    return ctx.prisma.updatePicture({
      where: { id },
      data: { published: true },
    })
  },

  async editPhoto(parent, args, ctx: Context, info) {
    const userId = getUserId(ctx)
    const photoExists = await ctx.prisma.$exists.picture({
      id: args.id,
      creator: { id: userId },
    })
    if (!photoExists) {
      throw new Error(`Picture not found or you're not the creator`)
    }

    return ctx.prisma.updatePicture({
      where: { id: args.id },
      data: {
        title: args.title,
        caption: args.caption,
        date: args.date,
        location: args.location,
        published: false
      }
    })
  },

  async deletePhoto(parent, { id }, ctx: Context, info) {
    const userId = getUserId(ctx)
    const photoExists = await ctx.prisma.$exists.picture({
      id,
      creator: { id: userId },
    })
    if (!photoExists) {
      throw new Error(`Picture not found or you're not the creator`)
    }

    return ctx.prisma.deletePicture({ id })
  },
}