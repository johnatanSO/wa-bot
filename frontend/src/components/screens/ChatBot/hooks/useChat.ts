import { IMessageForm, messageFormSchema } from '../interfaces/IMessageForm'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function useChat() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IMessageForm>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(messageFormSchema),
  })

  async function onSendMessage(messageData: IMessageForm) {
    console.log('messageData', messageData)
  }

  return {
    handleSubmit,
    register,
    onSendMessage,
    errors,
    isSubmitting,
  }
}
