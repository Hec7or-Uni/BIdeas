import status from "../../../libs/status"
import { Projects } from "prisma/queries/SELECT/projects"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method !== "GET") {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }

  existSession(req, res)
  handleGET(res)
}

async function existSession(req, res) {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }
}

// GET /api/teams/
async function handleGET(res) {
  res.status(200).json({
    data: { teams: await Projects() },
    status: status(200, ""),
  })
}
