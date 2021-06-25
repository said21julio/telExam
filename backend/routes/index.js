const { Router } = require('express');
const traficoRoute = require('./trafico.route');
const usuarioRoute = require('./usuario.route');
const habilidadRoute = require('./habilidad.route');
const bodyParser = require('body-parser');
const router= Router();
const raiz = '/api';
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.use(raiz + '/trafico', traficoRoute);
router.use(raiz + '/usuario', usuarioRoute);
router.use(raiz + '/habilidad', habilidadRoute);
module.exports = router;
