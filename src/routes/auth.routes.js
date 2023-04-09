import { Router } from "express";
const router=Router();

import * as authCtrl from '../controller/auth.controller'
import {verifySingnup} from '../middlewares'
router.post('/signUp', [verifySingnup.checkDuplicateUserOrEmail, verifySingnup.checkRolesExited], authCtrl.signUp)
router.post('/signIn', authCtrl.signIn)


export default router;