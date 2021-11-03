import { PrismaClient } from "@prisma/client"
import status from "../../../utils/status"
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()
const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(405)
      .json({
        status: status(405, ""),
      })
      .end()
  }

  const token = await getToken({ req, secret })
  if (!token) {
    res
      .status(401)
      .json({
        status: status(401, ""),
      })
      .end()
  }

  const users = await prisma.users.findMany({
    select: {
      id: true,
      avatar: true,
      name: true,
      lastName: true,
      studies: true,
    },
    take: 100,
  })

  res
    .status(200)
    .json({
      data: { users: users },
      status: status(200, ""),
    })
    .end()
}
