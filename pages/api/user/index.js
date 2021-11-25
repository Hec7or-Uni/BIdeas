import prisma from "../../../libs/prisma"
import status from "../../../libs/status"
import { getToken } from "next-auth/jwt"
import { createUser } from "../../../prisma/queries/CREATE/user"
import { User } from "../../../prisma/queries/SELECT/user"
import { Projects } from "../../../prisma/queries/SELECT/projects"
import { InProgress } from "../../../prisma/queries/SELECT/in-progress"

const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method === "POST") {
    const user = await createUser(JSON.parse(req.body))
    res.status(200).json({
      data: { user: user },
      status: status(200, ""),
    })
  } else if (req.method === "PUT") {
    const token = await getToken({ req, secret })
    if (!token) {
      res.status(401).json({
        status: status(401, ""),
      })
    } else {
      handlePUT(res, JSON.parse(req.body))
    }
  } else if (req.method === "GET") {
    const token = await getToken({ req, secret })
    if (!token) {
      res.status(401).json({
        status: status(401, ""),
      })
    } else {
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
    }
  } else if (req.method === "DELETE") {
    res.json({ status: status(200, "") })
  } else {
    res.json({ status: status(405, "") })
  }
}

// PUT /api/user/
async function handlePUT(res, query) {
  const updatedUser = await prisma.users.update({
    data: query,
    where: { id: query.id },
  })

  res.json({
    data: { user: updatedUser },
    status: status(405, ""),
  })
}
