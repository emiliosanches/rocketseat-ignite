import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  //type: z.enum(['income', 'outcome']),
})

type NewTransactionFormData = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<NewTransactionFormData>({
    resolver: zodResolver(newTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: NewTransactionFormData) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>

        <CloseButton>
          <X />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', {
              valueAsNumber: true
            })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <TransactionType>
            <TransactionTypeButton variant='income' value='income'>
              <ArrowCircleUp />
              Entrada
            </TransactionTypeButton>
            <TransactionTypeButton variant='outcome' value='outcome'>
              <ArrowCircleDown />
              Saída
            </TransactionTypeButton>
          </TransactionType>

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}