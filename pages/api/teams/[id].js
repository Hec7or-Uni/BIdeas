import prisma from "../../../libs/prisma"
import status from "../../../libs/status"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({
      status: status(405, ""),
    })
  }

  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
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
      owner: true,
    },
    where: {
      teamName: query,
    },
  })
  const dataUsers = await prisma.participates.findMany({
    include: {
      user: {
        select: {
          id: true,
          userName: true,
          avatar: true,
          name: true,
          lastName: true,
          description: true,
          studies: true,
          xp: true,
          plan: true,
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
