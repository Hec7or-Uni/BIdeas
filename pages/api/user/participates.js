import status from "../../../libs/status"
import { InProgressLite } from "../../../prisma/queries/SELECT/in-progress"
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
    const query = req.query.id
    const projsInProgress = await InProgressLite(query)
    res.status(200).json({
      data: {
        current: projsInProgress,
      },
      status: status(200, ""),
    })
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
