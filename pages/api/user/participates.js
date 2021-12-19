import status from "../../../libs/status"
import { InProgressLite } from "../../../prisma/queries/SELECT/in-progress"
import { deleteUserTeam } from "../../../prisma/queries/DELETE/user-team"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const allowedMethods = ["GET", "DELETE"]
  const method = req.method
  const token = await getToken({ req, secret, raw: true })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  if (method === "GET") {
    const query = req.query.id
    const projsInProgress = await InProgressLite(query)
    res.status(200).json({
      data: {
        current: projsInProgress,
      },
      status: status(200, ""),
    })
  } else if (method === "DELETE") {
    const { id } = req.query
    const deleted = await deleteUserTeam(id)
    await res.status(200).json({
      data: { deleted: deleted },
      status: status(200, ""),
    })
  }
}
