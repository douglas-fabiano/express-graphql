import { buildSchema } from 'graphql';
import ContaCorrente from '../model/conta_corrente';

interface depositar {
  conta: number,
  valor: number
}

interface sacar {
  conta: number,
  valor: number
}

interface saldo {
  conta: number
}

const schema = buildSchema(`
  type ContaCorrente {
    conta: Int
    saldo: Int
  }
  type Query {
    saldo(conta: Int!): ContaCorrente
  }
  type Mutation {
    sacar(conta: Int!, valor: Int!): ContaCorrente
    depositar(conta: Int!, valor: Int!): ContaCorrente
  }
`);

const resolvers = {
  async saldo({ conta }: saldo) {
    try {
      const contaBancaria = await ContaCorrente.findOne({ conta });

      return contaBancaria || new Error('Conta bancária não encontrada!');
    } catch {
      return new Error('Erro ao consultar o saldo, entre em contato com a agência bancária!');
    }
  },
  async sacar({ conta, valor}: sacar) {
    try {
      if (valor <= 0) {
        return new Error('Valor não permitido para saque!');
      }

      const contaBancaria: any = await ContaCorrente.findOne({ conta });

      if (!contaBancaria) {
        return new Error('Conta bancária não encontrada!');
      }

      if (valor > contaBancaria.saldo) {
        return new Error('Saldo insuficiente para a realização do saque!');
      }

      contaBancaria.saldo -= valor;

      await contaBancaria.save();

      return {
        conta: contaBancaria.conta,
        saldo: contaBancaria.saldo
      };
    } catch {
      return new Error('Erro ao efetivar o saque, entre em contato com a agência bancária!');
    }
  },
  async depositar({ conta, valor }: depositar) {
    try {
      if (valor <= 0) {
        return new Error('Valor não permitido para depósito!');
      }

      const contaBancaria: any = await ContaCorrente.findOne({ conta });

      if (!contaBancaria) {
        return new Error('Conta bancária não encontrada!');
      }

      contaBancaria.saldo += valor;

      await contaBancaria.save();

      return {
        conta: contaBancaria.conta,
        saldo: contaBancaria.saldo
      }
    } catch {
      return new Error('Erro ao efetivar o depósito, entre em contato com a agência bancária!');
    }
  }
};

export {
  schema,
  resolvers
}
