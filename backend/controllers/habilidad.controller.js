
const { habilidadModel } = require('../models');

const get = async (req,res) => {
  dbResult = await habilidadModel.getHabilidades();
  res.json(dbResult);
};

const post = async (req,res) => {
  if(!isValidHabilidad(req.body)) {
    return res.status(400).json([]);
  }
  await habilidadModel.setHabilidad(req.body.habilidad);
  res.status(201).json([]);
};

function isValidHabilidad (req) { 
  var regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
  if (req.hasOwnProperty('habilidad') && req.habilidad.match(regex) !== null)
    return true;
  return false;
}

module.exports = {
  get,
  post,
};
