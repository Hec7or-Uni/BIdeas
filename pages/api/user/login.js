import status from "../../../libs/status"
import { Credentials } from "../../../prisma/queries/SELECT/credentials"

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({
      status: status(405, ""),
    })
  }

  const query = JSON.parse(req.body)
  res.status(200).json({
    data: { user: await Credentials(query.id) },
    status: status(200, ""),
  })
}
