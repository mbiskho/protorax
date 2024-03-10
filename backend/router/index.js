const express = require("express");
const router = express.Router();
const { wrap } = require("../core/error/error-handler");

/**
 * Import Services
 * used for importing service functions
 */
const UserService = require('../app/service/user.service')



/**
 * [Domain] Base
 */
router.get("/", (req, res) => {
  return res.send("Server is Healthy");
});
router.post('/login', wrap(UserService.autenticate))


/**
 * User management
 */
router.get('/user', wrap(UserService.listUsers));
router.post('/user', wrap(UserService.createUser));
router.get('/user/:id', wrap(UserService.getUser));
router.put('/user/:id', wrap(UserService.updateUser));
router.delete('/user/:id', wrap(UserService.deleteUser));
module.exports = router;

module.exports = router;
