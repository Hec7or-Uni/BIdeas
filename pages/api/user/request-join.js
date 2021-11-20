import status from "../../../libs/status"
import { UserLite } from "../../../prisma/queries/SELECT/user"
import { ReqProjectsLite } from "../../../prisma/queries/SELECT/req-projs"
import { createReqProject } from "../../../prisma/queries/CREATE/req-proj"
import { deleteReqProject } from "../../../prisma/queries/DELETE/req-proj"
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
      const userId = token.id
      const body = JSON.parse(req.body)

      const request = await createReqProject({
        idUser: userId,
        idProject: body.id,
      })
      res.status(200).json({
        data: { request: request },
        status: status(200, ""),
      })
    } else if (req.method === "GET") {
      const userId = req.query.id
      const user = await UserLite(userId)
      const appliedTeamsRaw = await ReqProjectsLite(user.id)
      const appliedTeams = appliedTeamsRaw.map((item) => {
        return {
          id: item.id,
          idUser: item.idUser,
          idProject: item.idProject,
          project: item.project,
        }
      })

      res.status(200).json({
        data: {
          user: user,
          teams: appliedTeams,
        },
        status: status(200, ""),
      })
    } else if (req.method === "DELETE") {
      const id = req.query.id
      const deleted = await deleteReqProject(id)
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
