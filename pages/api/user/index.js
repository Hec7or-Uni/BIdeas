import prisma from "../../../libs/prisma"
import status from "../../../libs/status"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method === "POST") {
    handlePOST(res, JSON.parse(req.body))
  } else if (req.method === "PUT") {
    existSession(req, res)
    handlePUT(res, JSON.parse(req.body))
  } else if (req.method === "GET") {
    existSession(req, res)
    handleGET(res, req.query)
  } else if (req.method === "DELETE") {
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

async function existSession(req, res) {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
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

// GET /api/user/
async function handleGET(res, query) {
  const qUser = await prisma.users.findUnique({
    select: {
      id: true,
      userName: true,
      avatar: true,
      description: true,
      xp: true,
      respect: true,
      name: true,
      lastName: true,
      age: true,
      genre: true,
      country: true,
      studies: true,
      email: true,
      plan: true,
      av4hire: true,
      facebook: true,
      twitter: true,
      website: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      id: Number(query.id),
    },
  })
  const qProjects = await prisma.participates.findMany({
    include: {
      project: {
        select: {
          id: true,
          teamName: true,
          avatar: true,
          cover: true,
          motto: true,
          description: true,
          xp: true,
          respect: true,
          country: true,
          maxMembers: true,
          facebook: true,
          twitter: true,
          discord: true,
          createdAt: true,
          updatedAt: true,
          owner: true,
        },
      },
    },
    where: {
      idUser: Number(query.id),
    },
  })
  const qRecommended = await prisma.projects.findMany({
    select: {
      id: true,
      owner: true,
      teamName: true,
      avatar: true,
      cover: true,
      motto: true,
      description: true,
      xp: true,
      respect: true,
      country: true,
      maxMembers: true,
      facebook: true,
      twitter: true,
      discord: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      NOT: {
        owner: Number(query.id),
      },
    },
    take: 5,
  })

  res.json({
    data: {
      user: qUser,
      projects: {
        owns: qProjects.filter((item) => item.idUser === item.project.owner),
        participates: qProjects.filter(
          (item) => item.idUser !== item.project.owner
        ),
        recommended: qRecommended,
      },
    },
    status: status(200, ""),
  })
}

// DELETE /api/user/:id
// async function handleDELETE(postId, res) {
//   const post = await prisma.post.delete({
//     where: { id: Number(postId) },
//   })
//   res.json(post)
// }
