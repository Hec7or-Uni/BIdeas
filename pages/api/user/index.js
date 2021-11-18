import prisma from "../../../libs/prisma"
import status from "../../../libs/status"
import { getToken } from "next-auth/jwt"
import { User } from "../../../prisma/queries/SELECT/user"
import { Projects } from "../../../prisma/queries/SELECT/projects"
import { InProgress } from "../../../prisma/queries/SELECT/in-progress"

const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method === "POST") {
    handlePOST(res, JSON.parse(req.body))
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
      const user = await User("hec7orci7o")
      const PROJECTS = await Projects()
      const projsOwned = PROJECTS.filter((item) => item.owner === user.id)
      const projsInProgress = await InProgress(143)
      const projsRecommended = PROJECTS.filter((item) => item.owner !== user.id)

      res.json({
        data: {
          user: user,
          projects: {
            owns: projsOwned,
            participates: projsInProgress,
            recommended: projsRecommended,
          },
        },
        status: status(200, ""),
      })
    }
  } else if (req.method === "DELETE") {
    const token = await getToken({ req, secret })
    if (!token) {
      res.status(401).json({
        status: status(401, ""),
      })
    } else {
      res.end("ok")
    }
    // const query = req.url
    // const delUser = await prisma.users.delete({
    //   where: {
    //     id: 8,
    //   },
    // })
    // res.json({
    //   data: { delUser: delUser },
    //   status: status(200, ""),
    // })
  } else {
    res.json({ status: status(405, "") })
  }
}

// POST /api/user/
async function handlePOST(res, query) {
  const newUser = await prisma.users.create({ data: query })

  res.json({
    data: { user: newUser },
    status: status(200, ""),
  })
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

// DELETE /api/user/:id
// async function handleDELETE(postId, res) {
//   const post = await prisma.post.delete({
//     where: { id: Number(postId) },
//   })
//   res.json(post)
// }
