const dbConnection = require('../configuration/dbConnection');
const fields = 'radiobase, region, d01, d02, d03, d04, d05, d06, d07, d08, d09, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20, d21, d22, d23, d24, d25, d26, d27, d28, d29, d30';
const pageSize = 50;

const getTrafico = async (pagina) => {
    var offset = pageSize * pagina;
    const queryRequest = 'SELECT ' + fields + ' FROM reportetrafico LIMIT ' + pageSize + ' OFFSET ' + offset;
    const db = await executeQuery(queryRequest);
    return db;
};

const getTraficoByRadiobase = async (radiobase, pagina) => {
    var offset = pageSize * pagina;
    const queryRequest = 'SELECT ' + fields + ' FROM reportetrafico WHERE radiobase LIKE \'%' + radiobase + '%\' LIMIT ' + pageSize + ' OFFSET ' + offset;
    const db = await executeQuery(queryRequest);
    return db;
};

const getTraficoByRegion = async (region, pagina) => {
    var offset = pageSize * pagina;
    const queryRequest = 'SELECT ' + fields + ' FROM reportetrafico WHERE region= ' + region + ' LIMIT ' + pageSize + ' OFFSET ' + offset;
    const db = await executeQuery(queryRequest);
    return db;
};

const getRegiones = async () => {
    const queryRequest = 'SELECT region FROM regiones';
    const db = await executeQuery(queryRequest);
    return db;
};

const numberPages = async () => {
    const queryRequest = 'SELECT count(radiobase) as paginas FROM reportetrafico';
    const db = await executeQuery(queryRequest);
    return db;
}

const numberpagesByRegion = async (region) => {
    const queryRequest = 'SELECT count(radiobase) as paginas FROM reportetrafico WHERE region= ' + region;
    const db = await executeQuery(queryRequest);
    return db;
}

const numberpagesByRadiobase = async (radiobase) => {
    const queryRequest = 'SELECT count(radiobase) as paginas FROM reportetrafico WHERE radiobase LIKE \'%' + radiobase + '%\'';
    const db = await executeQuery(queryRequest);
    return db;
}

function executeQuery(queryRequest) {
    const connection = dbConnection();
    return new Promise((resolve, reject) => {
        connection.query(queryRequest, (err, res) => {
      if (err) {
       return reject(err)
      }
      connection.end();
      return resolve(res)
     })
    })
}

module.exports = {
    getTrafico,
    getTraficoByRegion,
    getTraficoByRadiobase,
    getRegiones,
    numberPages,
    numberpagesByRegion,
    numberpagesByRadiobase,
    pageSize,
};

