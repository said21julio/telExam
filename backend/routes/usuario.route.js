
const { Router } = require('express');
const { usuarioController } = require('../controllers');
const router = Router();

router.get('/:pagina', usuarioController.get);
router.post('/', usuarioController.post);

module.exports = router;
