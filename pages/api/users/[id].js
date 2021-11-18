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
  } else {
    if (req.method === "GET") {
      const user = await User(req.url.substring(11))
      const projects = await InProgress(user.id)

      res.status(200).json({
        data: {
          user: user,
          projects: projects,
        },
        status: status(200, ""),
      })
    } else {
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
