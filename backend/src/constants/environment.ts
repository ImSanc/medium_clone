export type Environment = { Bindings : {
    DATABASE_URL :string,
    JWT_SECRET :string,
    SALT : number
  },
Variables : {
    prisma : any
}
}
