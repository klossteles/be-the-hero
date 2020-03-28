const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('SESSION', () =>{
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to get a session', async () => {
    let response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD",
        email: "contato@teste.com",
        whatsapp: "4100000000",
        city: "Curitiba",
        uf: "PR"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    const ongId = response.body.id;
    
    response = await request(app)
      .post('/session')
      .send({
        id: ongId,
      });

    expect(response.body).toHaveProperty('name');
  });
});