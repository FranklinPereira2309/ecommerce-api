import { ErrorBase } from "./base.erro";


export class ValidationError extends ErrorBase {

    constructor(message: string) {
        super(400, message)
    }
}