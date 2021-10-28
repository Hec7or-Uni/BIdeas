import { PrismaClient } from "@prisma/client"

export default async (req, res) => {
  if (req.method === "POST") {
    const query = JSON.parse(req.body)
    try {
      const prisma = new PrismaClient()
      const newProject = await prisma.projects.create({
        data: query,
      })

      res.status(200).json({
        data: {
          project: newProject,
        },
        status: {
          status_code: 200,
          timestamp: new Date(),
        },
      })
    } catch (err) {}
  } else if (req.method === "PUT") {
    const query = JSON.parse(req.body)
    try {
      const prisma = new PrismaClient()
      const updatedProject = await prisma.projects.update({
        data: query,
        where: {
          id: query.id,
        },
      })

      res.status(200).json({
        data: {
          project: updatedProject,
        },
        status: {
          status_code: 200,
          timestamp: new Date(),
        },
      })
    } catch (err) {}
  } else if (req.method === "GET") {
    const query = JSON.parse(req.body)
    try {
      const prisma = new PrismaClient()
      const qTeam = await prisma.projects.findUnique({
        select: {
          id: true,
          owner: true,
          teamName: true,
          avatar: true,
          cover: true,
          motto: true,
          description: true,
          xp: true,
          respect: true,
          country: true,
          maxMembers: true,
          facebook: true,
          twitter: true,
          discord: true,
          createdAt: true,
          updatedAt: true,
        },
        where: {
          id: query.id,
        },
      })
      const qUsers = await prisma.participates.findMany({
        include: {
          user: {
            select: {
              userName: true,
              avatar: true,
              description: true,
              xp: true,
              respect: true,
              name: true,
              lastName: true,
              age: true,
              genre: true,
              country: true,
              studies: true,
              email: true,
              plan: true,
              av4hire: true,
              facebook: true,
              twitter: true,
              website: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        where: {
          idProject: query.id,
        },
      })

      res.status(200).json({
        data: {
          team: qTeam,
          users: {
            owner: qUsers.filter((item) => item.idUser === qTeam.owner),
            workers: qUsers.filter((item) => item.idUser !== qTeam.owner),
          },
        },
        status: {
          status_code: 200,
          timestamp: new Date(),
        },
      })
    } catch (err) {}
  } else if (req.method === "DELETE") {
    const query = JSON.parse(req.body)
    try {
      const prisma = new PrismaClient()
      const delUser = await prisma.users.delete({
        where: {
          id: query.id,
        },
      })
      res.status(200).json({
        data: {
          delUser: delUser,
        },
        status: {
          status_code: 200,
          timestamp: new Date(),
        },
      })
    } catch (err) {}
  } else {
    res.status(405).json({
      status: {
        status_code: 405,
        timestamp: new Date(),
      },
    })
  }
}
