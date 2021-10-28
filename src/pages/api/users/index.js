import { PrismaClient } from "@prisma/client"

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({
      status: {
        status_code: 405,
        timestamp: new Date(),
      },
    })
  }

  try {
    const prisma = new PrismaClient()
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
      data: {
        users: users,
      },
      status: {
        status_code: 200,
        timestamp: new Date(),
      },
    })
  } catch (err) {
    res.status(400).json({
      status: {
        status_code: 400,
        timestamp: new Date(),
      },
    })
  }
}
