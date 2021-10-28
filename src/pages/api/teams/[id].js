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
      teamName: query,
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

  res.status(200).json({
    data: {
      project: dataProject,
      users: dataUsers,
    },
    status: status(200, ""),
  })
}
