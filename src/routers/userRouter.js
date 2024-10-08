import express from 'express';
import {
  addCustomer,addAdmin,
  deleteOneUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  changePassword,
  checkEmail,
  checkCode,
  ResetPassword,
  sendMessage
} from '../controllers/userController';
import { protect } from '../middlewares/protect';
const router = express.Router();

router.post('/message', sendMessage);
router.post('/signup', addCustomer);
router.get('/', protect, getAllUsers);
router.post('/check', checkEmail);
router.post('/code/:identifier', checkCode);
router.get('/:id', protect, getOneUser);
router.put('/update/:id', protect, updateOneUser);
router.delete('/delete/:id', protect, deleteOneUser);
router.put('/changePassword', protect, changePassword);
router.put('/resetPassword/:identifier', ResetPassword);

export default router;
