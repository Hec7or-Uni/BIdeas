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
      res.status(200).json({
        data: {
          project: project,
          users: users.map((item) => item.user),
        },
        status: status(200, ""),
      })
    } else {
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
