import status from "../../../libs/status"
import { Project } from "../../../prisma/queries/SELECT/project"
import { InProgress } from "../../../prisma/queries/SELECT/in-progress"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  } else {
    if (req.method === "GET") {
      const project = await Project(req.url.substring(11))
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
          // users.map((item) => item.user),
        },
        status: status(200, ""),
      })
    } else {
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
