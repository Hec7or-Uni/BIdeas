import prisma from "../../../libs/prisma"
import status from "../../../libs/status"
import { deleteTeam } from "../../../prisma/queries/DELETE/team"
import { createUserTeam } from "../../../prisma/queries/CREATE/user-team"
import { Project } from "prisma/queries/SELECT/project"
import { InProgress } from "prisma/queries/SELECT/in-progress"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const allowedMethods = ["POST", "PUT", "GET", "DELETE"]
  const method = req.method
  const token = await getToken({ req, secret, raw: true })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }
  let data

  if (method === "POST") {
    const query = JSON.parse(req.body)
    const newProject = await prisma.projects.create({ data: query })
    await createUserTeam(newProject.owner, newProject.id)
    data = {
      project: newProject,
    }
  } else if (method === "PUT") {
    const query = JSON.parse(req.body)
    const updatedProject = await prisma.projects.update({
      data: query,
      where: { id: query.id },
    })

    data = {
      project: updatedProject,
    }
  } else if (method === "GET") {
    const team = await Project(req.query.id)
    if (team) {
      const USERS = await InProgress(undefined, team.id)
      const owner = USERS.filter((item) => item.user.id === team.owner)
      const workers = USERS.filter((item) => item.user.id !== team.owner)
      data = {
        team: team,
        users: {
          owner: owner[0],
          workers: workers,
        },
      }
    } else {
      data = {
        team: [],
        users: {
          owner: {},
          workers: [],
        },
      }
    }
  } else if (method === "DELETE") {
    const id = req.query.id
    console.log(id)
    const deleted = await deleteTeam(id)
    data = {
      deleted: deleted,
    }
  }

  res.status(200).json({
    data: data,
    status: status(200, ""),
  })
}
