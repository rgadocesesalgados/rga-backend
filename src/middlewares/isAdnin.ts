import { NextFunction, Response } from 'express'
import { PayLoad, RequestWithUser } from './isAuthenticated'
import { verify } from 'jsonwebtoken'
import { prismaClient } from '../prisma'

export const isAdmin = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).end()
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as PayLoad

    const userIsAdmin = await prismaClient.user.findUnique({
      where: {
        id: sub,
        role: 'ADMIN',
      },
    })

    if (!userIsAdmin) {
      return res.status(401).end()
    }

    return next()
  } catch (err) {
    return res.status(401).end()
  }
}
