import prisma from "../../../libs/prisma"

export async function pointsUser(id, numXP, numRespect) {
  let { xp, respect } = await prisma.users.findUnique({
    select: {
      xp: true,
      respect: true,
    },
    where: { id: id },
  })

  await prisma.users.update({
    data: {
      xp: (xp += numXP),
      respect: (respect += numRespect),
    },
    where: { id: id },
  })
}

export async function pointsTeam(id, numXP, numRespect) {
  let { xp, respect } = await prisma.projects.findUnique({
    select: {
      xp: true,
      respect: true,
    },
    where: { id: id },
  })

  xp += numXP
  respect += numRespect

  await prisma.projects.update({
    data: {
      xp: xp,
      respect: respect,
    },
    where: { id: id },
  })
}
