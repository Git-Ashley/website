import prisma from '@/lib/prisma'

async function main() {
  const response = await Promise.all([
    prisma.users.upsert({
      where: { email: 'ashleyp1621@gmail.com' },
      update: {},
      create: {
        name: 'Ashley Phillips',
        email: 'ashleyp1621@gmail.com',
        image:
          'https://media.licdn.com/dms/image/v2/D4E35AQGhE5H2VuXgBw/profile-framedphoto-shrink_800_800/B4EZTjDWnxHUAg-/0/1738976095078?e=1740524400&v=beta&t=cKnjN2PPMU5dE-K97j-8niQHBXo6jEpzuRbg6uG5pV0',
      },
    }),
  ])
  console.log(response)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })