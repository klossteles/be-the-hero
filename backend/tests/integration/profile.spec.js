const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('PROFILE', () =>{
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });
   it('should be able to get a list of incidents', async () => {
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
      ongId = response.body.id;

      response = await request(app)
        .post('/incidents')
        .set('Authorization', ongId)
        .send({
          title: "TESTE",
          description: "Description test",
          value: 120
        });

      expect(response.body).toHaveProperty('id');
      const incidentId = response.body.id;

      response = await request(app)
        .get('/profile')
        .set('Authorization', ongId);

      expect(response.body.length).toBeGreaterThanOrEqual(1);
   });
});