import mongoose from 'mongoose';

const ContaCorrenteSchema = new mongoose.Schema(
  {
    conta: {
      type: Number,
      required: true
    },
    saldo: {
      type: Number,
      required: true
    }
  },
  {
    collection: 'conta_corrente',
    timestamps: true
  }
);

export default mongoose.model("ContaCorrente", ContaCorrenteSchema);
