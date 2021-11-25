import status from "../../../libs/status"
import { createUserTeam } from "../../../prisma/queries/CREATE/user-team"
import { deleteReqProject } from "../../../prisma/queries/DELETE/req-proj"
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
      const query = JSON.parse(req.body)
      let data

      if (Number(query.type) === 0) {
        // Elimina la request: <team> <- <user> con id: <query.id>
        // Añade a la lista de participantes del team: <idProject> al user: <idUser>
        await deleteReqProject(query.id)
        data = await createUserTeam(query.idUser, query.idProject)
      } else {
        // Elimina la request: <user> -> <team> con id: <query.id>
        // Añade al user: <idUser> al team: <idProject>
        await deleteReqUser(query.id)
        data = await createUserTeam(query.idUser, query.idProject)
      }

      res.json({
        data: { info: data },
        status: status(200, ""),
      })
    } else if (req.method === "DELETE") {
      const query = req.query
      let del
      if (Number(query.type) === 0) {
        // Elimina la request: <team> <- <user> con id: <query.id>
        del = await deleteReqProject(query.id)
      } else {
        // Elimina la request: <user> -> <team> con id: <query.id>
        del = await deleteReqUser(query.id)
      }

      res.status(200).json({
        data: { delUser: del },
        status: status(200, ""),
      })
    } else {
      res.setHeader("Allow", ["POST", "DELETE"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
