import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const income = incomeTransactions
      .map(transaction => transaction.value)
      .reduce((sumValue, value) => sumValue + value, 0);
    const outcome = outcomeTransactions
      .map(transaction => transaction.value)
      .reduce((sumValue, value) => sumValue + value, 0);
    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // TODO
    const transaction = new Transaction({ title, value, type });
    if (transaction.type === 'outcome') {
      const { total } = this.getBalance();
      if (total < value) {
        throw Error('Outcome value exceeds cash value!');
      }
    }
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
