import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  category: string;
  price: number;
  createdAt: string;
}

interface NewTransactionData {
  description: string;
  price: number;
  category: string;
  type: string;
}

export interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => void;
  createNewTransaction: (transaction: NewTransactionData) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextType>({} as TransactionsContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsContextProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query ?? ''
      }
    })

    setTransactions(response.data);
  }

  async function createNewTransaction({ description, price, category, type }: NewTransactionData) {
    const response = await api.post('/transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date()
    });

    setTransactions((prev) => [response.data, ...prev])
  }

  useEffect(() => {
    fetchTransactions();
  }, [])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions, 
      createNewTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}