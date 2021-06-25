
const { Router } = require('express');
const { traficoController } = require('../controllers');
const router = Router();

router.get('/:pagina/:radiobase/:region', traficoController.get);

module.exports = router;
