import { ErrorBase } from "./base.erro";

export class InternalServerError extends ErrorBase {

    constructor(message = "Erro Interno do Servidor") {
        super(500, message)
    }
}