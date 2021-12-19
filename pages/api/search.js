import { getToken } from "next-auth/jwt"
import { UsersLite } from "../../prisma/queries/SELECT/users"
import { ProjectsLite } from "../../prisma/queries/SELECT/projects"

const secret = process.env.SECRET

export default async (req, res) => {
  const allowedMethods = ["GET"]
  const method = req.method
  const { q } = req.query
  const token = await getToken({ req, secret, raw: true })

  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }

  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  // we have a keyword to search for
  if (q) {
    const users = await UsersLite()
    const resultsU = users.filter((item) => {
      const { userName } = item
      return userName.toLowerCase().includes(q.toLowerCase())
    })

    const projects = await ProjectsLite()
    const resultsP = projects.filter((item) => {
      const { teamName } = item
      return teamName.toLowerCase().includes(q.toLowerCase())
    })

    return res.status(200).json(resultsU.concat(resultsP))
  }

  // we don't have anything
  res.status(400).json()
}
