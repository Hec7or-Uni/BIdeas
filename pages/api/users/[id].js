import status from "../../../libs/status"
import { User } from "../../../prisma/queries/SELECT/user"
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
          user: await User(req.url.substring(11)),
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
    } else {
      res.setHeader("Allow", ["GET"])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  }
}
