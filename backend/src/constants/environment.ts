
import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

// First, let's create a type for the accelerated Prisma client
type PrismaClientWithAccelerate = ReturnType<typeof createAcceleratedPrisma>

function createAcceleratedPrisma() {
    return new PrismaClient().$extends(withAccelerate())
}

export type Environment = { Bindings : {
    DATABASE_URL :string,
    JWT_SECRET :string,
    SALT : number
  },
Variables : {
    prisma : PrismaClientWithAccelerate,
    userId : string
}
}
