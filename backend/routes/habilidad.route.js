
const { Router } = require('express');
const { habilidadController } = require('../controllers');
const router = Router();

router.get('/', habilidadController.get);
router.post('/', habilidadController.post);

module.exports = router;
