import app from '../server';
import supertest from 'supertest';
import mongoose from  'mongoose';

const request = supertest(app);

afterAll(done => {
  mongoose.connection.close();
  app.close();
  done();
});

test("Conta bancária não encontrada", done => {
  request
    .post("/")
    .send({ query: "{ saldo(conta: 152321) { saldo } }" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((_err, res) => {
      expect(res.body.errors[0].message).toEqual('Conta bancária não encontrada!')
      done();
    });
});

test("Consulta saldo", done => {
  request
    .post("/")
    .send({ query: "{ saldo(conta: 15232) { saldo } }" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((_err, res) => {
      expect(typeof res.body.data.saldo.saldo).toBe('number')
      done();
    });
});

