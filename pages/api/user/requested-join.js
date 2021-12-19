import status from "../../../libs/status"
import { ProjectLite } from "../../../prisma/queries/SELECT/project"
import { ReqProjectLite } from "../../../prisma/queries/SELECT/req-proj"
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

  const query = req.query
  let team = {}
  let users = []
  try {
    const { id } = await ProjectLite(query)
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
  } catch (error) {
  } finally {
    res.status(200).json({
      data: {
        team: team,
        users: users,
      },
      status: status(200, ""),
    })
  }
}
