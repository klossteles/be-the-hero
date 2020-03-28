const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () =>{
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ONG', async () => {
    const response = await request(app)
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
   });

   it('should be able to list all ONGS', async () => {
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

    response = await request(app)
      .get('/ongs');
    
    expect(response.body.length).toBeGreaterThanOrEqual(1);
   });
});