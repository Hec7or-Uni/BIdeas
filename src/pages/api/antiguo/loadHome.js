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
    const dataUser = await prisma.users.findUnique({
      select: {
        id: true,
        userName: true,
        avatar: true,
        xp: true,
        respect: true,
        country: true,
        plan: true,
      },
      where: {
        userName: JSON.parse(req.body).id,
      },
    })

    const dataProjects = await prisma.participates.findMany({
      include: {
        project: {
          select: {
            avatar: true,
            teamName: true,
            description: true,
          },
        },
      },
      where: {
        idUser: dataUser.id,
      },
    })

    const dataRecommendedProjects = await prisma.participates.findMany({
      include: {
        project: {
          select: {
            avatar: true,
            teamName: true,
            description: true,
          },
        },
      },
      where: {
        NOT: {
          idUser: dataUser.id,
        },
      },
      take: 5,
    })

    const data = {
      data: {
        user: dataUser,
        inProgress: dataProjects,
        recommended: dataRecommendedProjects,
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
