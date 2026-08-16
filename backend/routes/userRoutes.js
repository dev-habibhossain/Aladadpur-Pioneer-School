import express from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

const router = express.Router();

// User CRUD Routes
router.route('/')
  .post(createUser)    // [CREATE]
  .get(getUsers);      // [READ ALL]

router.route('/:id')
  .get(getUserById)    // [READ SINGLE]
  .put(updateUser)     // [UPDATE]
  .delete(deleteUser); // [DELETE]

export default router;
