const dbConnection = require('../configuration/dbConnection');
const fields = 'id, nombre, email, puesto';
const pageSize = 50;

const getUsuarios = async (pagina) => {
    var offset = pageSize * pagina;
    var queryRequest = 'SELECT u.id, u.nombre, u.email, u.puesto, u.fechanacimiento, u.domicilio, group_concat(h.habilidad) habilidades FROM usuario as u ';
    queryRequest += 'left join usuariohabilidad as uh on u.id=uh.usuarioid ';
    queryRequest += 'left join habilidad as h on h.id=uh.habilidadid ';
    queryRequest += 'group by u.id LIMIT ' + pageSize + ' OFFSET ' + offset;
    const db = await executeQuery(queryRequest);
    return db;
};

const setUsuario = async (usuarioData) => {
    // modificar por una transaccion
    var queryRequest = 'INSERT INTO usuario (nombre, email, puesto, fechanacimiento, domicilio) VALUES (';
    queryRequest += '\'' + usuarioData.nombre +'\',\'' + usuarioData.email +'\',\'' + usuarioData.puesto + '\',\'' + usuarioData.fechaNacimiento + '\',\'' + usuarioData.domicilio + '\');';
    const db = await executeQuery(queryRequest);
    usuarioData.habilidades.forEach(n => {
        queryRequest = 'INSERT INTO usuariohabilidad (usuarioid, habilidadid) SELECT MAX(id), ' + n + ' from usuario';
        executeQuery(queryRequest);
    });
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
    getUsuarios,
    setUsuario,
    pageSize,
};

