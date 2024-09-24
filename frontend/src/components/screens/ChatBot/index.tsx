'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from 'react-hook-form'
import style from './ChatBot.module.scss'
import { IMessageForm, messageFormSchema } from './interfaces/IMessageForm'
import { zodResolver } from '@hookform/resolvers/zod'

export function ChatBotComponent() {
  const { handleSubmit, register } = useForm<IMessageForm>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(messageFormSchema),
  })

  async function onSendMessage(messageData: IMessageForm) {
    console.log('data', messageData)
  }

  return (
    <section className={style.chatContainer}>
      <form
        className={style.formContainer}
        onSubmit={handleSubmit(onSendMessage)}
      >
        <CustomTextField
          placeholder="Digite a sua mensagem"
          {...register('message')}
        />

        <button className={style.sendMessageButton} type="submit">
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </form>
    </section>
  )
}
