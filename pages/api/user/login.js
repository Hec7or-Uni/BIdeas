import status from "../../../libs/status"
import { Credentials } from "../../../prisma/queries/SELECT/credentials"

export default async (req, res) => {
  if (req.method === "POST") {
    const query = JSON.parse(req.body)

    res.status(200).json({
      data: { user: await Credentials(query.id) },
      status: status(200, ""),
    })
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
