import { Hono } from 'hono'
import user from './routes/user'
import blog from './routes/blog'

const app = new Hono()

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
