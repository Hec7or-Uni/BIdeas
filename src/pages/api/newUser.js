import { PrismaClient } from "@prisma/client"

export default async (req, res) => {
  if (req.method !== "POST") {
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
    const newUser = await prisma.users.create({ data: JSON.parse(req.body) })

    const data = {
      data: {
        user: newUser,
      },
      status: {
        status_code: 200,
        timestamp: new Date(),
      },
    }

    res.status(200).json(data)
  } catch (err) {
    res.status(400).json({
      status: {
        status_code: 400,
        timestamp: new Date(),
        method: "Bad Request",
      },
    })
  } finally {
    prisma.$disconnect()
  }
}
