import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './SendMessages.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useState } from 'react'

export function SendMessagesComponent() {
  const [phones, setPhones] = useState<string[]>([])
  const [phoneInput, setPhoneInput] = useState<string>('')

  function onAddPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setPhones((oldPhones) => [...oldPhones, phoneInput])

    setPhoneInput('')
  }

  return (
    <div>
      <section className={style.phonesContainer}>
        <button type="button" className={style.selectFileButton}>
          Importar .csv
        </button>

        <form onSubmit={onAddPhone} className={style.addPhoneForm}>
          <CustomTextField
            size="small"
            label="Telefone"
            placeholder="Digite o telefone"
            value={phoneInput}
            onChange={(event) => {
              setPhoneInput(event.target.value)
            }}
          />

          <button type="button" className={style.addNewPhoneButton}>
            <FontAwesomeIcon icon={faPlus} className={style.icon} />
          </button>
        </form>

        <ul className={style.phonesList}>
          {phones.map((phone) => {
            return (
              <li key={phone} className={style.phoneItem}>
                <b>{phone}</b>

                <FontAwesomeIcon icon={faTrash} className={style.icon} />
              </li>
            )
          })}
        </ul>
      </section>

      <CustomTextField
        label="Mensagem"
        placeholder="Digite a mensagem que deseja enviar"
        multiline
        rows={5}
      />
    </div>
  )
}
