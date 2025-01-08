import Fastify from 'fastify';
import routes from './routes';

const app = Fastify();

app.register(routes);

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
}, () => {
  console.log("I am listening on port: 3000");
});
