import { PrismaClient } from "@prisma/client"

export default async (req, res) => {
  if (req.method === "POST") {
    const query = JSON.parse(req.body)
    try {
      const prisma = new PrismaClient()
      const newUser = await prisma.users.create({ data: query })

      res.status(200).json({
        data: {
          user: newUser,
        },
        status: {
          status_code: 200,
          timestamp: new Date(),
        },
      })
    } catch (err) {}
  } else if (req.method === "PUT") {
    try {
      const query = JSON.parse(req.body)
      const prisma = new PrismaClient()
      const updatedUser = await prisma.users.update({
        data: query,
        where: {
          id: query.id,
        },
      })

      res.status(200).json({
        data: {
          user: updatedUser,
        },
        status: {
          status_code: 200,
          timestamp: new Date(),
        },
      })
    } catch (err) {}
  } else if (req.method === "GET") {
    // const query = JSON.parse(req.body)
    const query = { id: 2 }

    try {
      const prisma = new PrismaClient()
      const qUser = await prisma.users.findUnique({
        select: {
          id: true,
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
        where: {
          id: query.id,
        },
      })
      const qProjects = await prisma.participates.findMany({
        include: {
          project: {
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
              maxMembers: true,
              facebook: true,
              twitter: true,
              discord: true,
              createdAt: true,
              updatedAt: true,
              owner: true,
            },
          },
        },
        where: {
          idUser: query.id,
        },
      })
      const qRecommended = await prisma.projects.findMany({
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
          NOT: {
            owner: query.id,
          },
        },
        take: 20,
      })

      res.status(200).json({
        data: {
          user: qUser,
          projects: {
            owns: qProjects.filter(
              (item) => item.idUser === item.project.owner
            ),
            participates: qProjects.filter(
              (item) => item.idUser !== item.project.owner
            ),
            recommended: qRecommended,
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
