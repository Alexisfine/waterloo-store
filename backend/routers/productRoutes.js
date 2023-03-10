import express from 'express';
import {
    getProducts,
    getProductById,
    deleteProductById,
    createProduct,
    updateProduct
} from "../controller/productController.js";
import {admin, protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);

router.route('/:id').get(getProductById).delete(protect, admin, deleteProductById).put(protect, admin, updateProduct);


export default router;
