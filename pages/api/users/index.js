import { PrismaClient } from "@prisma/client"
import status from "../../../../utils/status"

const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({
      status: status(405, ""),
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
