import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { BasicStrategy } from "passport-http";
import { User, UserInstance } from "../models/User";

const notAuthorizedJson = {
    status: 401,
    message: "Não autorizado"
}

//aqui configura a sua Strategy
passport.use(new BasicStrategy(async (email, password, done) => {
    if (email && password) {
        const user = await User.findOne({
            where: { email, password }
        });
        if (user) {
            // Primeiro parametro, é o erro nesse caso não deu erro, null pela falta de erro, e o usuario que esta autenticando
            return done(null, user);
        }
    }
    /*
        Aqui como houve erro mandamos a mensagem de erro configurada,
        como primeiro parametro, false no segundo parametro pq não deu certo a autenticação.
    */
    return done(notAuthorizedJson, false);
}));

// Criando um middleware pra usar na rota
export const privateRoute = (req: Request, res: Response, next: NextFunction) => {
    const authFunction = passport.authenticate("basic", (err: Error, user: UserInstance) => {
        console.log("User no MD: ", user);
        req.user = user;
        return user ? next() : next(notAuthorizedJson)
    })(req, res, next); // essa linha é um rewsumo da linha abaixo que é rodar a função, dessa forma aqui ja criamos executando a função.

    // authFunction(req, res, next);
}

export default passport