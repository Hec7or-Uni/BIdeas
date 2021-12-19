import status from "../../../libs/status"
import { getToken } from "next-auth/jwt"
import { createUser } from "../../../prisma/queries/CREATE/user"
import { deleteUser } from "../../../prisma/queries/DELETE/user"
import { User } from "../../../prisma/queries/SELECT/user"
import { Projects } from "../../../prisma/queries/SELECT/projects"
import { InProgress } from "../../../prisma/queries/SELECT/in-progress"
import { updateUser } from "prisma/queries/PUT/user"

const secret = process.env.SECRET

export default async (req, res) => {
  const allowedMethods = ["POST", "PUT", "GET", "DELETE"]
  const method = req.method
  if (!allowedMethods.includes(method)) {
    res.setHeader("Allow", allowedMethods)
    res.status(405).end(`Method ${method} Not Allowed`)
  }

  if (method === "POST") {
    const user = await createUser(JSON.parse(req.body))
    res.status(200).json({
      data: { user: user },
      status: status(200, ""),
    })
  } else if (method === "PUT") {
    const token = await getToken({ req, secret })
    if (!token) {
      res.status(401).json({
        status: status(401, ""),
      })
    }
    const query = JSON.parse(req.body)
    const updatedUser = await updateUser(token.id, query)
    res.json({
      data: { user: updatedUser },
      status: status(405, ""),
    })
  } else if (method === "GET") {
    const token = await getToken({ req, secret })
    console.log(token)
    if (!token) {
      res.status(401).json({
        status: status(401, ""),
      })
    }
    const user = await User(req.query.id)
    const PROJECTS = await Projects()
    const projsOwned = PROJECTS.filter((item) => item.owner === user.id)
    const projsInProgress = await InProgress(req.query.id)
    const projsRecommended = PROJECTS.filter((item) => item.owner !== user.id)

    res.json({
      data: {
        user: user,
        projects: {
          owns: projsOwned.length !== 0 ? projsOwned : {},
          participates: projsInProgress.length !== 0 ? projsInProgress : [],
          recommended: projsRecommended.length !== 0 ? projsRecommended : [],
        },
      },
      status: status(200, ""),
    })
  } else if (method === "DELETE") {
    const id = req.query.id
    const deleted = await deleteUser(id)
    res.status(200).json({
      data: { deleted: deleted },
      status: status(200, ""),
    })
  }
}
