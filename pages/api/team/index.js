import prisma from "../../../libs/prisma"
import status from "../../../libs/status"
import { Project } from "prisma/queries/SELECT/project"
import { InProgress, InProgressLite } from "prisma/queries/SELECT/in-progress"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const allowedMethods = ["POST", "PUT", "GET", "DELETE"]
  const method = req.method
  const token = await getToken({ req, secret })
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
    // para recibir un parametro id en la query hay que usar urlparams para que la url quede de la forma:
    // http://localhost:3000/api/team?id=<id a eliminar>
    const { id } = req.query // id del project que se desea eliminar
    const participatesRaw = await InProgressLite(undefined, id)
    const participates = participatesRaw.map((item) => {
      return {
        id: item.id,
        idUser: item.idUser,
        idProject: item.idProject,
        owner: item.project.owner === item.idUser,
      }
    })
    data = { done: participates }

    participates.forEach((item) => {
      // delete de la tabla participates mediante el id: <item.id>
      console.log(item.id)
    })
    // una vez eliminados los registros de  participaciones para el id: item.id
    // procedemos a borrar de la tabla de projects el team con id: participates.idProject
  }

  res.status(200).json({
    data: data,
    status: status(200, ""),
  })
}
