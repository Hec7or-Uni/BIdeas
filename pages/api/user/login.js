import status from "../../../libs/status"
import { Credentials } from "../../../prisma/queries/SELECT/credentials"

export default async (req, res) => {
  const allowedMethods = ["POST"]
  const method = req.method

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  const query = JSON.parse(req.body)
  res.status(200).json({
    data: { user: await Credentials(query.id) },
    status: status(200, ""),
  })
}
