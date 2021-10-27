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
        email: true,
        avatar: true,
        description: true,
        xp: true,
        respect: true,
        name: true,
        lastName: true,
        country: true,
        studies: true,
        plan: true,
        facebook: true,
        twitter: true,
        website: true,
      },
      where: {
        userName: req.url.substring(11),
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

    const data = {
      data: {
        user: dataUser,
        projects: dataProjects,
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
