import { PrismaClient } from "@prisma/client"

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({
      status: {
        status_code: 405,
        timestamp: new Date(),
        method: "Method not allowed",
      },
    })
  }

  const prisma = new PrismaClient()

  try {
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

    const data = {
      data: {
        users: users,
      },
      status: {
        status_code: 200,
        timestamp: new Date(),
      },
    }

    res.status(200).json(data)
  } catch (err) {
    console.log("error")
    res.status(400).json({
      status: {
        status_code: 400,
        timestamp: new Date(),
        method: "Bad Request",
      },
    })
  } finally {
    await prisma.$disconnect()
  }
}
