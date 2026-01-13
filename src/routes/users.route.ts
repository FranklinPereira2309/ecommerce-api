import express, {Request, Response} from "express";

export const userRoutes = express.Router();

type User = {
  id: number; 
  nome: string; 
  email: string 
}

let id = 0

let usuarios: User[] = []

userRoutes.get("/", (req, res) => {
    res.send("Bem Vindo ao Curso - Welcome2");
})

userRoutes.get("/users", (req: Request, res: Response) => {

    res.send(usuarios)
})

userRoutes.post("/users", async (req: Request, res: Response) => {
    let users = req.body
    users.id = ++id
    usuarios.push(users)
    res.status(200).send({ message: "Usuário criado com sucesso!" })
})

userRoutes.get("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id)
    let user = usuarios.find(user => user.id === userId)
    res.send(user)
})

userRoutes.put("/users/:id", (req: Request, res: Response) => {
    let user = req.body
    let userId = Number(req.params.id)
    let indexOf = usuarios.findIndex((_user: User) => _user.id === userId)

    usuarios[indexOf].nome = user.nome
    usuarios[indexOf].email = user.email

    res.send({
        messsage: "Usuário alterado com sucesso!"
    })

})

userRoutes.delete("/users/:id", (req: Request, res: Response) => {
    let userId = Number(req.params.id)
    let indexOf = usuarios.findIndex((_user: User) => _user.id === userId)

    usuarios.splice(indexOf, 1)

    return res.send({
        message: "Usuário excluído com sucesso!"
    })
})