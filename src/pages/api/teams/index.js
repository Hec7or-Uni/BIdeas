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

    res.status(200).json({
      data: {
        projects: projects,
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
