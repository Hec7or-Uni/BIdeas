import status from "../../../libs/status"
import { Projects } from "prisma/queries/SELECT/projects"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  res.status(200).json({
    data: { teams: await Projects() },
    status: status(200, ""),
  })
}
