const dbConnection = require('../configuration/dbConnection');

const getHabilidades = async () => {
    const queryRequest = 'SELECT * FROM habilidad';
    const db = await executeQuery(queryRequest);
    return db;
};

const setHabilidad = async (habilidad) => {
    var queryRequest = 'INSERT INTO habilidad (habilidad) VALUES (\'' + habilidad + '\')';
    const db = await executeQuery(queryRequest);
    return db;
};

function executeQuery(queryRequest) {
    const connection = dbConnection();
    return new Promise((resolve, reject) => {
        connection.query(queryRequest, (err, res) => {
      if (err) {
        console.log('err');
       return reject(err)
      }
      connection.end();
      return resolve(res);
     })
    })
}

module.exports = {
    getHabilidades,
    setHabilidad,
};
