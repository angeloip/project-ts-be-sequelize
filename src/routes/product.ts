import { Router } from 'express'
import { productController } from '../controllers/product'

const router = Router()

router.post('/', productController.createProduct)
router.get('/', productController.getProducts)
router.get('/:id', productController.getProduct)
//router.post('/category', productController.getProductsByCategory)
router.patch('/:id', productController.updateProduct)
router.delete('/:id', productController.deleteProduct)
router.post('/many', productController.createProducts)
/* 
router.post('/category', productController.getProductsByCategory)
router.patch('/image/:id', multerMiddleware, productController.updatePicture) */

export { router }
