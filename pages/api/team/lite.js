import status from "../../../libs/status"
import { ProjectLite } from "prisma/queries/SELECT/project"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const allowedMethods = ["GET"]
  const method = req.method

  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  const data = { teams: await ProjectLite(req.query.id) }

  res.status(200).json({
    data: data,
    status: status(200, ""),
  })
}
