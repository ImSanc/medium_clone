import { Hono } from 'hono'
import user from './routes/user'
import blog from './routes/blog'
import { connectDB } from './middlewares/prismaClient';
import { Environment } from './constants/environment';
import { cors} from "hono/cors";

const app = new Hono<Environment>().basePath("/api");

app.use('/api/*',cors());
app.use(connectDB);
app.route('/v1/user', user);
app.route('/v1/blog', blog);

app.onError( (err, c) => {
  console.error(`${err}`);
  return c.text("Internal Server Error", 500);
});

app.notFound( async (c)=> {
  return c.text("Not Found", 404);
});

export default app
