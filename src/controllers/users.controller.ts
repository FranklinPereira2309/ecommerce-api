import { NextFunction, Request, Response } from "express"
import { getFirestore } from "firebase-admin/firestore"
import { ValidationError } from "../errors/validation.error";
import { NotFoundError } from "../errors/not-found-error";

type User = {
    id: number;
    nome: string;
    email: string
}
// let id = 0

//let usuarios: User[] = []

export class UserController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection("users").get()
            const users = snapshot.docs.map(doc => {
                
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            res.send(users)
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id
        const doc = await getFirestore().collection("users").doc(userId).get()
        //let user = usuarios.find(user => user.id === userId)
        if(doc.exists) {
            res.send({
                id: doc.id,
                ...doc.data()
            })

        } else {
            throw new NotFoundError("Usuário não encontrado!!")
        }
        
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        let user = req.body
            if(!user.email || user.email?.lenght === 0) {
                throw new ValidationError("E-mail obrigatório!")
            }
            const userSave = await getFirestore().collection("users").add(user)
            // users.id = ++id
            // usuarios.push(users)
            res.status(200).send({ message: `Usuário ${userSave.id} criado com sucesso!` })
    }


    static async update(req: Request, res: Response, next: NextFunction) {

        let user = req.body as User
            let userId = req.params.id
            let docRef = getFirestore().collection("users").doc(userId)
            //let indexOf = usuarios.findIndex((_user: User) => _user.id === userId)
            // usuarios[indexOf].nome = user.nome
            // usuarios[indexOf].email = user.email

            if((await docRef.get()).exists) {
                await docRef.set({
                    nome: user.nome,
                    email: user.email
                })

                res.send({
                    messsage: "Usuário alterado com sucesso!"
                })

            } else {
                throw new NotFoundError("Usuário não encontrado!")
            }    

    }

    static async delete(req: Request, res: Response, next: NextFunction) {
       let userId = req.params.id
            // let indexOf = usuarios.findIndex((_user: User) => _user.id === userId)
            // usuarios.splice(indexOf, 1)
            await getFirestore().collection("users").doc(userId).delete()
            res.send({
                message: "Usuário excluído com sucesso!"
            })
    }

}