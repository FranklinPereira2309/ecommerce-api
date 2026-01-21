import { ErrorBase } from "./base.erro";

export class NotFoundError extends ErrorBase {

    constructor(message: string) {
        super(404, message)
    }
}