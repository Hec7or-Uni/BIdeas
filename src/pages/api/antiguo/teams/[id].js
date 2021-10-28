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

  console.log(req.url.substring(11))

  try {
    const dataProject = await prisma.projects.findUnique({
      select: {
        id: true,
        teamName: true,
        avatar: true,
        cover: true,
        motto: true,
        description: true,
        xp: true,
        respect: true,
        country: true,
        facebook: true,
        twitter: true,
        discord: true,
      },
      where: {
        teamName: req.url.substring(11),
      },
    })

    const dataUsers = await prisma.participates.findMany({
      include: {
        user: {
          select: {
            avatar: true,
            name: true,
            lastName: true,
            description: true,
          },
        },
      },
      where: {
        idProject: dataProject.id,
      },
    })

    const data = {
      data: {
        project: dataProject,
        users: dataUsers,
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
    await prisma.$disconnect()
  }
}
