import ContaCorrente from './src/model/conta_corrente';

const popularBanco = () => {
  const contas = [28920, 15232, 47256];

  contas.forEach(async (valor) => {
    const conta = await ContaCorrente.findOne({ conta: valor });

    if (!conta) {
      await ContaCorrente.create({
        conta: valor,
        saldo: 100
      })
    }
  });
}

export default popularBanco
