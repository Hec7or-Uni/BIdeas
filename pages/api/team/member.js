import status from "../../../libs/status"
import { createUserTeam } from "../../../prisma/queries/CREATE/user-team"
import { deleteReqProject } from "../../../prisma/queries/DELETE/req-proj"
import { deleteReqUser } from "../../../prisma/queries/DELETE/req-user"
import { getToken } from "next-auth/jwt"
import { pointsUser, pointsTeam } from "../../../prisma/queries/PUT/puntos"

const secret = process.env.SECRET

export default async (req, res) => {
  const allowedMethods = ["POST", "DELETE"]
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
    const query = JSON.parse(req.body)
    Number(query.type) === 0
      ? await deleteReqProject(query.id) // Elimina la request: <team> <- <user> con id: <query.id>
      : await deleteReqUser(query.id) // Elimina la request: <user> -> <team> con id: <query.id>
    // Añade a la lista de participantes del team: <idProject> al user: <idUser>
    // Añade al user: <idUser> al team: <idProject>
    const data = await createUserTeam(query.idUser, query.idProject)

    console.log(typeof query.idProject)
    Number(query.type) === 0
      ? await pointsUser(query.idUser, 5, 1)
      : await pointsTeam(query.idProject, 5, 1)

    res.json({
      data: { info: data },
      status: status(200, ""),
    })
  } else if (method === "DELETE") {
    const query = req.query
    const del =
      Number(query.type) === 0
        ? await deleteReqProject(query.id) // Elimina la request: <team> <- <user> con id: <query.id>
        : await deleteReqUser(query.id) // Elimina la request: <user> -> <team> con id: <query.id>

    res.status(200).json({
      data: { delUser: del },
      status: status(200, ""),
    })
  }
}
