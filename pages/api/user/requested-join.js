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
  } else {
    if (req.method === "GET") {
      const userId = req.query.id || "143"
      const { id } = await ProjectLite(userId)
      let team = {}
      let users = []

      const data = await ReqProjectLite(id)

      if (data.length !== 0) {
        console.log(typeof data)

        team = data[0].project
        users = data.map((item) => item.user)
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
}
