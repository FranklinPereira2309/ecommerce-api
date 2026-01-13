import { Request, Response } from "express"

type User = {
    id: number;
    nome: string;
    email: string
}

let id = 0

let usuarios: User[] = []

export class UserController {
    static getAll(req: Request, res: Response) {

        res.send(usuarios)
    }

    static getById(req: Request, res: Response) {
        let userId = Number(req.params.id)
        let user = usuarios.find(user => user.id === userId)
        res.send(user)
    }
    static save(req: Request, res: Response) {
        let users = req.body
        users.id = ++id
        usuarios.push(users)
        res.status(200).send({ message: "Usuário criado com sucesso!" })
    }


    static update(req: Request, res: Response) {
        let user = req.body
        let userId = Number(req.params.id)
        let indexOf = usuarios.findIndex((_user: User) => _user.id === userId)

        usuarios[indexOf].nome = user.nome
        usuarios[indexOf].email = user.email

        res.send({
            messsage: "Usuário alterado com sucesso!"
        })

    }

    static delete(req: Request, res: Response) {
        let userId = Number(req.params.id)
        let indexOf = usuarios.findIndex((_user: User) => _user.id === userId)

        usuarios.splice(indexOf, 1)

        return res.send({
            message: "Usuário excluído com sucesso!"
        })
    }

}