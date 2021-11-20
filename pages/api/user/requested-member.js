import status from "../../../libs/status"
import { ReqUserLite } from "../../../prisma/queries/SELECT/req-user"
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
      const data = await ReqUserLite(userId)
      let user
      let teams = []
      console.log(user, teams)
      if (data !== undefined) {
        user = data[0].user
        teams = data.map((item) => item.project)
      }

      res.status(200).json({
        data: {
          user: user,
          teams: teams,
        },
        status: status(200, ""),
      })
    } else {
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
