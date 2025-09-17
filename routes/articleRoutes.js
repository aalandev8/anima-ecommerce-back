const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

// Middleware para validación (opcional)
// const { validateArticle, validatePagination } = require('../middleware/validation');
// const auth = require('../middleware/auth'); 

router.get('/', articleController.index);                    // GET /articles
router.get('/:id', articleController.show);                 // GET /articles/:id
router.post('/', articleController.store);                  // POST /articles
router.put('/:id', articleController.update);               // PUT /articles/:id
router.delete('/:id', articleController.destroy);           // DELETE /articles/:id

// Routes especiales
router.get('/dietary/:type', articleController.getByDietaryRestrictions); // GET /articles/dietary/vegan
router.get('/category/:category', articleController.getByCategory);       // GET /articles/category/tortas
router.patch('/:id/stock', articleController.updateStock);                // PATCH /articles/:id/stock

module.exports = router;