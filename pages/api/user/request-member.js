import status from "../../../libs/status"
import { ProjectLite } from "prisma/queries/SELECT/project"
import { ReqUsersLite } from "prisma/queries/SELECT/req-users"
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
      // const query = JSON.parse(req.body)
      // const newMember = await prisma.requestRecruit.create({ data: query })
      // res.status(200).json({
      //   data: { user: newMember },
      //   status: status(200, ""),
      // })
    } else if (req.method === "GET") {
      const ownerId = req.query.id
      const team = await ProjectLite(ownerId)
      const contactedUsersRaw = await ReqUsersLite(team.id)
      const contactedUsers = contactedUsersRaw.map((item) => item.user)

      res.status(200).json({
        data: {
          teams: team,
          users: contactedUsers,
        },
        status: status(200, ""),
      })
    } else {
      res.setHeader("Allow", ["POST, GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
