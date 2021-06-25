
const { traficoModel } = require('../models');
const get = async (req,res) => {
  var dbResult = { data: [], regiones: [], numberpages: 1 };
  !isNaN(parseInt(req.params.pagina)) && parseInt(req.params.pagina)>0 ? req.params.pagina=parseInt(req.params.pagina)-1 : req.params.pagina=0;
  dbResult.regiones = await traficoModel.getRegiones();
  if (req.params.radiobase.match(/RB([0-9]|[A-Z])+/gi) !== null) {
    console.log(1);
    dbResult.numberpages = await traficoModel.numberpagesByRadiobase(req.params.radiobase);
    dbResult.numberpages = Math.ceil(dbResult.numberpages[0].paginas / traficoModel.pageSize);
    dbResult.data = await traficoModel.getTraficoByRadiobase(req.params.radiobase, req.params.pagina);
  } else if(!isNaN(parseInt(req.params.region))) {
    dbResult.numberpages = await traficoModel.numberpagesByRegion(req.params.region);
    dbResult.numberpages = Math.ceil(dbResult.numberpages[0].paginas / traficoModel.pageSize);
    dbResult.data = await traficoModel.getTraficoByRegion(req.params.region, req.params.pagina);
  } else {
    dbResult.numberpages = await traficoModel.numberPages();
    dbResult.numberpages = Math.ceil(dbResult.numberpages[0].paginas / traficoModel.pageSize);
    dbResult.data = await traficoModel.getTrafico(req.params.pagina);
  }
  res.json(dbResult);
};

module.exports = {
  get,
};
