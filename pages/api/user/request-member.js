import status from "../../../libs/status"
import { ProjectLite } from "../../../prisma/queries/SELECT/project"
import { ReqUsersLite } from "../../../prisma/queries/SELECT/req-users"
import { createReqUser } from "../../../prisma/queries/CREATE/req-user"
import { deleteReqUser } from "../../../prisma/queries/DELETE/req-user"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  } else {
    if (req.method === "POST") {
      const userId = token.id.toString()
      const body = JSON.parse(req.body)
      const { id } = await ProjectLite(userId)

      const request = await createReqUser({
        idUser: body.id,
        idProject: id,
      })
      res.status(200).json({
        data: { request: request },
        status: status(200, ""),
      })
    } else if (req.method === "GET") {
      const ownerId = req.query.id
      const team = await ProjectLite(ownerId)
      let contactedUsers = []
      if (team !== undefined) {
        const contactedUsersRaw = await ReqUsersLite(team.id)
        contactedUsers = contactedUsersRaw.map((item) => {
          return {
            id: item.id,
            idUser: item.idUser,
            idProject: item.idProject,
            user: item.user,
          }
        })
      }

      res.status(200).json({
        data: {
          team: team,
          users: contactedUsers,
        },
        status: status(200, ""),
      })
    } else if (req.method === "DELETE") {
      const { id } = req.query
      const deleted = await deleteReqUser(id)
      res.status(200).json({
        data: { deleted: deleted },
        status: status(200, ""),
      })
    } else {
      res.setHeader("Allow", ["POST, GET, DELETE"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
