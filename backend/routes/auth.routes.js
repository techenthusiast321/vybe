import { signUp } from "../controllers/auth.controllers.js";
import express from 'express';
import { signIn } from "../controllers/auth.controllers.js";
import { signOut } from "../controllers/auth.controllers.js";
import { sendOtp, verifyOtp, resetPassword } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/signin', signIn);

authRouter.post('/sendOtp', sendOtp);
authRouter.post('/verifyOtp', verifyOtp);
authRouter.post('/resetPassword', resetPassword);

authRouter.get('/signout', signOut);

export default authRouter;