import status from "../../../libs/status"
import { Project } from "../../../prisma/queries/SELECT/project"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method !== "GET") {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }

  existSession(req, res)

  const id = req.url.substring(11)
  handleGET(res, id)
}

async function existSession(req, res) {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }
}

// GET /api/teams/[id]
async function handleGET(res, id) {
  res.status(200).json({
    data: {
      project: await Project(id),
      // users: await prisma.participates.findMany({
      //   include: {
      //     user: {
      //       select: {
      //         id: true,
      //         userName: true,
      //         avatar: true,
      //         name: true,
      //         lastName: true,
      //         description: true,
      //         studies: true,
      //         xp: true,
      //         plan: true,
      //       },
      //     },
      //   },
      //   where: {
      //     idProject: dataProject.id,
      //   },
    },
    status: status(200, ""),
  })
}
