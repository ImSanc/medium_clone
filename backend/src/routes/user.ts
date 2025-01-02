import { Hono } from "hono"

const user = new Hono();

user.post( '/signup', async (c) => {
    console.log(" User signup api called ")
});

user.post( '/signin', async (c) => {
    console.log(" User signin api called ")
});

export default user;