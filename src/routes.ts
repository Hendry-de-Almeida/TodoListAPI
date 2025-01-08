import { FastifyInstance } from "fastify";
import { Tasks } from "./Controller/tasksController";

const task = new Tasks();

export default function routes(fastify: FastifyInstance) {
  fastify.get("/tarefa", task.veiwTaskList);
  fastify.post("/tarefa", task.createTask);
  fastify.put("/tarefa", task.updateTask);
  fastify.delete("/tarefa", task.deleteTask);
}
