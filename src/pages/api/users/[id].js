import { PrismaClient } from "@prisma/client"
import status from "../../../../utils/status"

const prisma = new PrismaClient()

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({
      status: status(405, ""),
    })
  }

  const query = req.url.substring(11)
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
      userName: query,
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

  res.status(200).json({
    data: {
      user: dataUser,
      projects: dataProjects,
    },
    status: status(200, ""),
  })
}
