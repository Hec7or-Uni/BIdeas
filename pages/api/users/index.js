import status from "../../../libs/status"
import { Users } from "../../../prisma/queries/SELECT/users"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method === "GET") {
    existSession(req, res)
    handleGET(res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

async function existSession(req, res) {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }
}

// GET /api/users/
async function handleGET(res) {
  res.status(200).json({
    data: { users: await Users() },
    status: status(200, ""),
  })
}
