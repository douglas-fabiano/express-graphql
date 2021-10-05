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
    .send({ query: "mutation { sacar(conta: 15232, valor: 0) { conta, saldo } }" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((_err, res) => {
      expect(res.body.errors[0].message).toEqual('Valor não permitido para saque!')
      done();
    });
});

test("Conta bancária não encontrada", done => {
  request
    .post("/")
    .send({ query: "mutation { sacar(conta: 152321, valor: 10) { conta, saldo } }" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((_err, res) => {
      expect(res.body.errors[0].message).toEqual('Conta bancária não encontrada!')
      done();
    });
});

test("Saldo insuficiente", done => {
  request
    .post("/")
    .send({ query: "mutation { sacar(conta: 15232, valor: 1000) { conta, saldo } }" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((_err, res) => {
      expect(res.body.errors[0].message).toEqual('Saldo insuficiente para a realização do saque!')
      done();
    });
});

test("Saque concluído", done => {
  request
    .post("/")
    .send({ query: "mutation { sacar(conta: 15232, valor: 10) { conta, saldo } }" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .end((_err, res) => {
      expect(typeof res.body.data.sacar.saldo).toBe('number')
      expect(typeof res.body.data.sacar.conta).toBe('number')
      done();
    });
});
