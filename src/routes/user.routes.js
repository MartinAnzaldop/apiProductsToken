import { Router } from "express";
import * as userCtrl  from '../controller/userCtrl'
import {authJwt, verifySingnup} from '../middlewares'
const router=Router('/', );



router.post('/', [
authJwt.verifyToken, 
authJwt.isAdmin],
verifySingnup.checkRolesExited,
 userCtrl.createUser)
export default router;