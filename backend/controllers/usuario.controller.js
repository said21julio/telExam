
const { usuarioModel } = require('../models');

const get = async (req,res) => {
  var dbResult = { data: [], numberpages: 1 };
  !isNaN(parseInt(req.params.pagina)) && parseInt(req.params.pagina)>0 ? req.params.pagina=parseInt(req.params.pagina)-1 : req.params.pagina=0;
  dbResult.data = await usuarioModel.getUsuarios(req.params.pagina);
  res.json(dbResult);
};

const post = async (req,res) => {
  if(!isValidUser(req.body)) {
    return res.status(400).json([]);
  }
  await usuarioModel.setUsuario(req.body);
  res.status(201).json([]);
};

function isValidUser (user) { 
  var regexAlfabetico = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
  var regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
  var regexFecha = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/g;
  if (!user.hasOwnProperty('nombre') || user.nombre.match(regexAlfabetico) === null) {
    console.log('1');
    return false;
  } 
  if (!user.hasOwnProperty('email') || user.email.match(regexEmail) === null) {
    console.log('2');
    return false;
  } 
  if (!user.hasOwnProperty('puesto') || user.puesto.match(regexAlfabetico) === null) {
    console.log('3');
    return false;
  } 
  if (!user.hasOwnProperty('fechaNacimiento') || user.fechaNacimiento.match(regexFecha) === null) {
    console.log('4');
    return false;
  } 
  if (!user.hasOwnProperty('domicilio') || user.domicilio.match(regexAlfabetico) === null) {
    console.log('5');
    return false;
  } 
  if (!user.hasOwnProperty('habilidades') || !Array.isArray(user.habilidades) || !user.habilidades.every((n) => { return !isNaN(parseInt(n))}) || user.habilidades.length<=0) {
    console.log('6');
    return false;
  } 
  return true;
}

module.exports = {
  get,
  post,
};
