import { Request, Response } from "express";
import User from "../entity/User";
import { getRepository } from "typeorm";

class UserController {

    static index = async (req: Request, res: Response) => {
        const users = await getRepository(User)
        .createQueryBuilder("user")
        .getMany();
        return res.send(users);
    }

    static store = async (req: Request, res: Response) => {
        const user = await User.create(req.body);
        const userExists = await User.findOne({email: req.body.email});
        if (userExists != null) return res.status(400).send("E-mail já cadastrado!");
        if (!user.save()) return res.status(500).send("Erro ao cadastrar usuário");
        return res.status(201).send(user);
    }

}

export default UserController;
