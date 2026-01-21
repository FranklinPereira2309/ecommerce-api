import express from "express";
import { routes } from "./routes/index"
import { initializeApp } from 'firebase-admin/app';
import { errorHandler } from "./middlewares/error-handler.middleware"
import { pageNotFoundHandler } from "./middlewares/page-not-found-handler.middleware";

initializeApp()

const app = express();

routes(app)
pageNotFoundHandler(app)
errorHandler(app)

// app.use((error: Error, req: Request, res: Response, next: NextFunction) => {

//   res.status(500).send({
//     message: "Erro Inteno do Servidor!"
//   })

// })

app.listen(3000, () => {
  console.log('Servidor ativo na porta 3000');
});

