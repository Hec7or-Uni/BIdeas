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
    const projects = await prisma.projects.findMany({
      select: {
        id: true,
        avatar: true,
        teamName: true,
        motto: true,
        createdAt: true,
      },
      take: 1000,
    })

    const data = {
      data: {
        projects: projects,
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
