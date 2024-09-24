'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './ChatBot.module.scss'
import { useChat } from './hooks/useChat'

export function ChatBotComponent() {
  const { handleSubmit, onSendMessage, register } = useChat()

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
