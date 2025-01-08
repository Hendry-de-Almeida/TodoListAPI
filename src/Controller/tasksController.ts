import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { Body, Params } from "../schemas/tasks";

const prisma = new PrismaClient();

export class Tasks {
  async createTask(request: FastifyRequest, reply: FastifyReply) {
    const { title, description } = request.body as Body;

    if (!title || !description)
      return reply
        .status(400)
        .send("Verififique se a tarefa contem um titulo e uma descrição");

    const created_task = await prisma.task.create({
      data: {
        title: title,
        description: description,
      },
    });

    reply.status(200).send(created_task);
  }

  async veiwTaskList(request: FastifyRequest, reply: FastifyReply) {
    {
      const tasks = await prisma.task.findMany();

      if (tasks.length > 0) reply.send(tasks);
      else reply.send("Sem tarefas");
    }
  }

  async updateTask(request: FastifyRequest, reply: FastifyReply) {
    const { title, description } = request.body as Body;
    const { id } = request.params as Params;

    if (!title || !description)
      return reply.status(400).send("Corpo da requesição incompleto");

    const updated_task = await prisma.task.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
      },
    });

    if (!updated_task)
      return reply
        .status(404)
        .send("A tarefa que pretende actualizar não existe!");

    reply.status(200).send(updated_task);
  }

  async deleteTask(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as Params;

    const deleted_task = await prisma.task.delete({
      where: {
        id: id,
      },
    });

    if (!deleted_task)
      return reply
        .status(404)
        .send("A tarefa que pretende deletar não existe!");

    reply.status(200).send(deleted_task);
  }
}
