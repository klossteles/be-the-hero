const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;
    const [ count ] = await connection('incidents').where('ong_id', ong_id).count(); 

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');

    response.header('X-TOTAL-COUNT', count['count(*)']);
    return response.json(incidents);
  }   
}