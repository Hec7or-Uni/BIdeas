import status from "../../../libs/status"
import { Users } from "../../../prisma/queries/SELECT/users"
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
      data: { users: await Users() },
      status: status(200, ""),
    })
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
