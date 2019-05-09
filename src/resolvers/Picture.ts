import { Context } from '../utils'

export const Picture = {
  creator: ({ id }, args, ctx: Context) => {
    return ctx.prisma.picture({ id }).creator()
  },
}
