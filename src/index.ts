import express, { Request, Response } from "express";

const app = express();

app.use(express.json())

let id = 0

let usuarios: { id: number, nome: string, email: string }[] = []

app.get("/", (req, res) => {
  res.send("Bem Vindo ao Curso - Welcome2");
})

app.get("/users", (req: Request, res: Response) => {

  res.send(usuarios)
})

app.post("/users", async (req: Request, res: Response) => {
  let users = req.body
  users.id = ++id
  usuarios.push(users)
  res.status(200).send({ message: "Usuário criado com sucesso!" })
})

app.get("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id)
  let user = usuarios.find(user => user.id === userId)
  res.send(user)
})

app.put("/users/:id", (req: Request, res: Response) => {
  const { nome, email } = req.body
  let userId = Number(req.params.id)
  let user = usuarios.find(user => user.id === userId)


  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado!" })
  }

  if (nome) user.nome = nome
  if (email) user.email = email

  return res.json(user)


})

app.delete("/users/:id", (req: Request, res: Response) => {
  let userId = Number(req.params.id)
  let user = usuarios.find(user => user.id === userId)

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado!" })
  }

  let userDelete = usuarios.filter(user => user.id !== userId)

  return res.send(userDelete)
})

app.listen(3000, () => {
  console.log('Servidor ativo na porta 3000');
});

