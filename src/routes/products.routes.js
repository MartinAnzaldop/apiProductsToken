import { Router } from "express";
const router=Router();
import * as productsCtrol from '../controller/products.controller'
import {authJwt} from '../middlewares'


router.get('/', productsCtrol.getProducts) 

router.post('/', [authJwt.verifyToken, authJwt.isAdmin], productsCtrol.createProducts)
router.get('/:productId', productsCtrol.getProductsById)
router.put('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrol.updateProductsById)
router.delete('/:productId', [authJwt.verifyToken, authJwt.isAdmin], productsCtrol.deleteProductsById)
export default router;
    