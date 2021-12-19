import status from "../../../libs/status"
import { ProjectLite } from "../../../prisma/queries/SELECT/project"
import { ReqUsersLite } from "../../../prisma/queries/SELECT/req-users"
import { createReqUser } from "../../../prisma/queries/CREATE/req-user"
import { deleteReqUser } from "../../../prisma/queries/DELETE/req-user"
import { pointsUser, pointsTeam } from "../../../prisma/queries/PUT/puntos"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const allowedMethods = ["POST", "GET", "DELETE"]
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

  if (method === "POST") {
    const body = JSON.parse(req.body)
    const client = body.idCli.toString()
    const { id } = await ProjectLite(client)

    const request = await createReqUser({
      idUser: body.idReq,
      idProject: id,
    })

    await pointsTeam(id, 1, 0)
    await pointsUser(body.idReq, 5, 1)

    res.status(200).json({
      data: { request: request },
      status: status(200, ""),
    })
  } else if (method === "GET") {
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
  } else if (method === "DELETE") {
    const { id } = req.query
    const deleted = await deleteReqUser(id)
    res.status(200).json({
      data: { deleted: deleted },
      status: status(200, ""),
    })
  }
}
