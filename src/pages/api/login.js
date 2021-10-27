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
    const dataUser = await prisma.users.findUnique({
      select: {
        userName: true,
        email: true,
        salt: true,
        passwd: true,
      },
      where: {
        email: JSON.parse(req.body).email,
      },
    })

    const data = {
      data: {
        user: dataUser,
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
