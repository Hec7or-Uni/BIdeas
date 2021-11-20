import prisma from "../../../libs/prisma"
import status from "../../../libs/status"
import { UserLite } from "../../../prisma/queries/SELECT/user"
import { ReqProjectsLite } from "../../../prisma/queries/SELECT/req-projs"
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
      res.status(200).json({
        data: {
          user: await prisma.requestJoin.create({
            data: query,
          }),
        },
        status: status(200, ""),
      })
    } else if (req.method === "GET") {
      const userId = req.query.id || "143"
      const user = await UserLite(userId)
      const appliedTeamsRaw = await ReqProjectsLite(user.id)
      const appliedTeams = appliedTeamsRaw.map((item) => item.project)

      res.status(200).json({
        data: {
          user: user,
          teams: appliedTeams,
        },
        status: status(200, ""),
      })
    } else {
      res.setHeader("Allow", ["POST", "GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
