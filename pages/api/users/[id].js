import status from "../../../libs/status"
import { User } from "../../../prisma/queries/SELECT/user"
import { InProgress } from "../../../prisma/queries/SELECT/in-progress"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }
  if (req.method === "GET") {
    const id = req.url.substring(11)
    const user = await User(id)
    const projects = await InProgress(user.id)

    let owns = []
    let participates = []
    if (projects !== undefined) {
      owns = projects.filter((item) => item.idUser === item.project.owner)
      participates = projects.filter(
        (item) => item.idUser !== item.project.owner
      )
      if (owns !== undefined) {
        owns = owns.map((item) => item.project)
      }
      if (participates !== undefined) {
        participates = participates.map((item) => item.project)
      }
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
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
