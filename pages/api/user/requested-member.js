import status from "../../../libs/status"
import { ReqUserLite } from "../../../prisma/queries/SELECT/req-user"
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
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  const query = req.query.id
  const data = await ReqUserLite(query)
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
