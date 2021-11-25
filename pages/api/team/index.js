import prisma from "../../../libs/prisma"
import status from "../../../libs/status"
import { Project } from "prisma/queries/SELECT/project"
import { InProgress } from "prisma/queries/SELECT/in-progress"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }

  if (req.method === "POST") {
    const query = JSON.parse(req.body)
    const newProject = await prisma.projects.create({ data: query })

    res.json({
      data: { project: newProject },
      status: status(200, ""),
    })
  } else if (req.method === "PUT") {
    const query = JSON.parse(req.body)
    const updatedProject = await prisma.projects.update({
      data: query,
      where: { id: query.id },
    })

    res.json({
      data: { project: updatedProject },
      status: status(200, ""),
    })
  } else if (req.method === "GET") {
    const team = await Project(req.query.id)
    if (team) {
      let USERS = await InProgress(undefined, team.id)
      USERS = USERS.map((item) => item.user)
      const owner = USERS.filter((item) => item.id === team.owner)
      const workers = USERS.filter((item) => item.id !== team.owner)

      res.json({
        data: {
          team: team,
          users: {
            owner: owner[0],
            workers: workers,
          },
        },
        status: status(200, ""),
      })
    } else {
      res.json({
        data: {
          team: [],
          users: {
            owner: {},
            workers: [],
          },
        },
        status: status(200, ""),
      })
    }
  } else if (req.method === "DELETE") {
    res.status(200).json({
      status: {
        status_code: 200,
        timestamp: new Date(),
      },
    })
  } else {
    res.setHeader("Allow", ["POST", "PUT", "GET", "DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
