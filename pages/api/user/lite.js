import status from "../../../libs/status"
import { UserLite } from "prisma/queries/SELECT/user"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }
  if (req.method === "GET") {
    res.status(200).json({
      data: { user: await UserLite(req.query.id) },
      status: status(200, ""),
    })
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
