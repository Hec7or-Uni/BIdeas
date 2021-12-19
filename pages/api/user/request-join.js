import status from "../../../libs/status"
import { UserLite } from "../../../prisma/queries/SELECT/user"
import { ProjectId } from "../../../prisma/queries/SELECT/project"
import { InProgressLite } from "../../../prisma/queries/SELECT/in-progress"
import { ReqProjectsLite } from "../../../prisma/queries/SELECT/req-projs"
import { createReqProject } from "../../../prisma/queries/CREATE/req-proj"
import { deleteReqProject } from "../../../prisma/queries/DELETE/req-proj"
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
    const query = JSON.parse(req.body)

    const { maxMembers } = await ProjectId(query.idProject)

    const members = await InProgressLite(
      query.idUser.toString(),
      query.idProject.toString()
    )

    if (maxMembers === members.length - 1) {
      res.status(400).json({
        status: status(400, ""),
      })
    } else {
      const request = await createReqProject({
        idUser: query.idUser,
        idProject: query.idProject,
      })

      await pointsTeam(query.idProject, 5, 1)
      await pointsUser(query.idUser, 1, 0)

      res.status(200).json({
        data: { request: request },
        status: status(200, ""),
      })
    }
  } else if (method === "GET") {
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
  } else if (method === "DELETE") {
    const id = req.query.id
    const deleted = await deleteReqProject(id)
    res.status(200).json({
      data: { deleted: deleted },
      status: status(200, ""),
    })
  }
}
