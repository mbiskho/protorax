const jwt = require("jsonwebtoken");
const UserRepository = require("../repository/user.repository");
const { plainToClass } = require("class-transformer");
const { UserModel } = require("../../core/model");


const UserService = {
    async autenticate(req, res) {
        const { username, password } = req.body;
        const user = await UserRepository.autenticate(username);

        const passwordIsValid = password === user.password;
        if (!passwordIsValid) {
            return res
                .status(401)
                .json({ status: 401, message: "Invalid Password" });
        }

        if (!user) {
            res.status(404).json({
                status: 404,
                message: "Maaf user belum terdaftar",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                name: user.username,
                role: user.role,
                gender: user.gender,
                password: user.password,
                id_school: user.id_school,
            },
            "BACKEND",
            {
                expiresIn: 86400, // expires in 24 hours
            }
        );

    res.status(200).json({ token: token, user: user });
  },
  async listUsers(req, res) {
    try {
      const users = await UserRepository.getAllUser()
      res.json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

    async createUser(req, res) {
        try {
            const user = {
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                role: req.body.role,
                gender: req.body.gender,
                id_school: req.body.id_school,
            };

            const newUser = await UserRepository.createUser(user);
            if (!newUser)
                res.status(500).json({
                    message: "User fail to create",
                });
            res.status(200).json(newUser);
        } catch (error) {
            res.status(500).send(error);
        }
    },

  async updateUser(req, res) {
    try {
      const id = req.params.id;
      let user = plainToClass(UserModel, req.body);
      const updatedUser = await UserRepository.updateUser(id, user)
      res.json(updatedUser);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async getUser(req, res){
    try {
      const id = req.params.id;
      const users = await UserRepository.getUser(id )
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const status = await UserRepository.deleteUser(id)
      if(status)
        res.status(200).send({ message: 'User deleted successfully' });
      res.status(500).send({ message: 'User cannot be deleted' });
    } catch (error) {
      res.status(500).send({ message: 'Error deleting user' });
    }
  },

    async deleteUser(req, res) {
        try {
            await UserRepository.deleteUser(req.params.id);
            res.status(200).send({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).send({ message: "Error deleting user" });
        }
    },
};

module.exports = UserService;
