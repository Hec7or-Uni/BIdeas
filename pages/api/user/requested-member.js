import status from "../../../libs/status"
import { ReqUserLite } from "../../../prisma/queries/SELECT/req-user"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  const userId = token.id.toString()
  const data = await ReqUserLite(userId)
  let user = {}
  let teams = []
  if (data.length !== 0) {
    user = data[0]
    teams = data.map((item) => {
      return {
        id: item.id,
        idUser: item.idUser,
        idProject: item.idProject,
        projects: item.project,
      }
    })
    delete user.project
  }

  res.status(200).json({
    data: {
      user: user,
      teams: teams,
    },
    status: status(200, ""),
  })
}
