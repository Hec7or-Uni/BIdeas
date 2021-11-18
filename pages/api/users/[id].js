import status from "../../../libs/status"
import { User } from "../../../prisma/queries/SELECT/user"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({
      status: status(405, ""),
    })
  }

  existSession(req, res)
  handleGET(res, req.url.substring(11))
}

async function existSession(req, res) {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  }
}

// GET /api/users/[id]
async function handleGET(res, id) {
  res.status(200).json({
    data: {
      user: await User(id),
      // projects: await prisma.participates.findMany({
      //   include: {
      //     project: {
      //       select: {
      //         avatar: true,
      //         teamName: true,
      //         description: true,
      //       },
      //     },
      //   },
      //   where: {
      //     idUser: dataUser.id,
      //   },
      // }),
    },
    status: status(200, ""),
  })
}
