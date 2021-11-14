import prisma from "../../../libs/prisma"
import status from "../../../libs/status"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({
      status: status(405, ""),
    })
  }

  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
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

  res.status(200).json({
    data: { users: users },
    status: status(200, ""),
  })
}
