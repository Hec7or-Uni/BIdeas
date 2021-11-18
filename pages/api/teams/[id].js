import status from "../../../libs/status"
import { Project } from "../../../prisma/queries/SELECT/project"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

export default async (req, res) => {
  const token = await getToken({ req, secret })
  if (!token) {
    res.status(401).json({
      status: status(401, ""),
    })
  } else {
    if (req.method === "GET") {
      res.status(200).json({
        data: {
          project: await Project(req.url.substring(11)),
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
    } else {
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
