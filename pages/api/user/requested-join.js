import status from "../../../libs/status"
import { ProjectLite } from "../../../prisma/queries/SELECT/project"
import { ReqProjectLite } from "../../../prisma/queries/SELECT/req-proj"
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
    const ownerId = token.id.toString()
    const { id } = await ProjectLite(ownerId)
    let team = {}
    let users = []
    const data = await ReqProjectLite(id)

    if (data.length !== 0) {
      team = data[0]
      users = data.map((item) => {
        return {
          id: item.id,
          idUser: item.idUser,
          idProject: item.idProject,
          users: item.user,
        }
      })
      delete team.user
    }

    res.status(200).json({
      data: {
        team: team,
        users: users,
      },
      status: status(200, ""),
    })
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
