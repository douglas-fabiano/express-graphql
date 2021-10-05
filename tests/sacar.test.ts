import app from '../server';
import supertest from 'supertest';
import mongoose from  'mongoose';

const request = supertest(app);

afterAll(done => {
  mongoose.connection.close();
  app.close();
  done();
});

test("Valor não permitido", done => {
  request
    .post("/")
    .send({ query: "mutation { depositar(conta: 15232, valor: 0) { conta, saldo } }" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((_err, res) => {
      expect(res.body.errors[0].message).toEqual('Valor não permitido para depósito!')
      done();
    });
});

test("Conta bancária não encontrada", done => {
  request
    .post("/")
    .send({ query: "mutation { depositar(conta: 152321, valor: 10) { conta, saldo } }" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((_err, res) => {
      expect(res.body.errors[0].message).toEqual('Conta bancária não encontrada!')
      done();
    });
});

test("Depósito concluído", done => {
  request
    .post("/")
    .send({ query: "mutation { depositar(conta: 15232, valor: 10) { conta, saldo } }" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((_err, res) => {
      expect(typeof res.body.data.depositar.saldo).toBe('number')
      expect(typeof res.body.data.depositar.conta).toBe('number')
      done();
    });
});
