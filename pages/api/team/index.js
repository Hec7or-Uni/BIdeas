import { PrismaClient } from "@prisma/client"
import status from "../../../utils/status"
import { getToken } from "next-auth/jwt"

const prisma = new PrismaClient()
const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    res
      .status(401)
      .json({
        status: status(401, ""),
      })
      .end()
  }

  if (req.method === "POST") {
    const query = JSON.parse(req.body)
    const newProject = await prisma.projects.create({ data: query })

    res
      .json({
        data: { project: newProject },
        status: status(200, ""),
      })
      .end()
  } else if (req.method === "PUT") {
    const query = JSON.parse(req.body)
    const updatedProject = await prisma.projects.update({
      data: query,
      where: { id: query.id },
    })

    res
      .json({
        data: { project: updatedProject },
        status: status(200, ""),
      })
      .end()
  } else if (req.method === "GET") {
    const query = req.query
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
        id: Number(query.id),
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
        idProject: Number(query.id),
      },
    })

    res
      .json({
        data: {
          team: qTeam,
          users: {
            owner: qUsers.filter((item) => item.idUser === qTeam.owner),
            workers: qUsers.filter((item) => item.idUser !== qTeam.owner),
          },
        },
        status: status(200, ""),
      })
      .end()
  } else if (req.method === "DELETE") {
    // const query = JSON.parse(req.body)
    // const prisma = new PrismaClient()
    // const delUser = await prisma.users.delete({
    //   where: {
    //     id: query.id,
    //   },
    // })
    // res.status(200).json({
    //   data: {
    //     delUser: delUser,
    //   },
    //   status: {
    //     status_code: 200,
    //     timestamp: new Date(),
    //   },
    // })
  } else {
    res
      .status(405)
      .json({
        status: status(405, ""),
      })
      .end()
  }
}
