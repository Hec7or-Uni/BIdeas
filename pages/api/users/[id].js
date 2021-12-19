import status from "../../../libs/status"
import { User } from "../../../prisma/queries/SELECT/user"
import { InProgress } from "../../../prisma/queries/SELECT/in-progress"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const allowedMethods = ["GET"]
  const method = req.method
  const token = await getToken({ req, secret, raw: true })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  const id = req.url.substring(11).replace("%20", " ")
  const user = await User(id)
  const projects = await InProgress(user.id)

  let owns = []
  let participates = []
  if (projects !== undefined) {
    owns = projects.filter((item) => item.idUser === item.project.owner)
    participates = projects.filter((item) => item.idUser !== item.project.owner)
  }

  res.status(200).json({
    data: {
      user: user,
      projects: {
        owns: owns,
        participates: participates,
      },
    },
    status: status(200, ""),
  })
}
