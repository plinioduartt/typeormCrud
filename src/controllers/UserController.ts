import { Request, Response } from "express";
import Users from "../entity/Users";
import Roles from "../entity/Roles";
import { getRepository } from "typeorm";
import bcrypt = require("bcryptjs");



class UserController {

    static index = async (req: Request, res: Response) => {

        const users = await getRepository(Users)
        .createQueryBuilder("users")
        .loadAllRelationIds({relations: ['roles']})
        .getMany();

        return res.json(users);

    }



    static store = async (req: Request, res: Response) => {

        const role = await Roles.findOne({ str_name: req.body.role });
        var user = await Users.create(req.body);

        user.password = await bcrypt.hash(user.password, 10);
        user.role = role;

        const userExists = await Users.findOne({ str_username: req.body.str_username });
        
        if (userExists != null) return res.status(400).json({ message: "Usuário já cadastrado!"});;
        if (!user.save()) return res.status(500).send("Erro ao cadastrar usuário");
        
        return res.status(201).send(user);

    }



    static show = async (req: Request, res: Response) => {

        try {
            var user = await Users.findOneOrFail({ where: {id: +req.params.id}, relations: ['role'] });
        } catch (error) {
            return res.status(400).json({ message: "Usuário não encontrado"});
        }
        return res.send(user);

    }



    static update = async (req: Request, res: Response) => {

        try {
            var user = await Users.findOneOrFail({ where: {id: +req.params.id}, relations: ['role'] });
        } catch (error) {
            return res.status(400).json({ message: "Usuário não encontrado"});
        }
     
        if (req.body.role != null) req.body.role = await Roles.findOne({ str_name: req.body.role });
        if (req.body.password != null) req.body.password = await bcrypt.hash(req.body.password, 10);

        try {
            user = await Users.merge(user, req.body);
            user.save();
        } catch (err) {
            return res.status(500).send("On update user error", err);
        }

        return res.send(user);

    }



    static delete = async (req: Request, res: Response) => {

        try {
            var user = await Users.findOneOrFail({ where: {id: +req.params.id}, relations: ['role'] });
        } catch (error) {
            return res.status(400).json({ message: "Usuário não encontrado"});
        }
        await Users.remove(user);
       
        return res.status(200).json({ message: "Deletado!" });
    }

}

export default UserController;
