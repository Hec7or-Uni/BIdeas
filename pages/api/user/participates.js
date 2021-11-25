import status from "../../../libs/status"
import { InProgressLite } from "../../../prisma/queries/SELECT/in-progress"
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

  const query = req.query.id
  const projsInProgress = await InProgressLite(query)
  res.status(200).json({
    data: {
      current: projsInProgress,
    },
    status: status(200, ""),
  })
}
