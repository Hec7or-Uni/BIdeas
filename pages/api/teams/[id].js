import status from "../../../libs/status"
import { Project } from "../../../prisma/queries/SELECT/project"
import { InProgress } from "../../../prisma/queries/SELECT/in-progress"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const allowedMethods = ["GET"]
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

  const id = req.url.substring(11).replace("%20", " ")

  const project = await Project(id)
  const users = await InProgress(undefined, project.id)
  const owner = users
    .filter((item) => item.idUser === item.project.owner)
    .map((item) => item.user)[0]
  const workers = users
    .filter((item) => item.idUser !== item.project.owner)
    .map((item) => item.user)

  res.status(200).json({
    data: {
      project: project,
      users: {
        owner: owner,
        workers: workers,
      },
    },
    status: status(200, ""),
  })
}
