'use client'

import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './SendMessages.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useState } from 'react'
import { Divider } from '@mui/material'
import { Loading } from '@/components/_ui/Loading'

export function SendMessagesComponent() {
  const [phones, setPhones] = useState<string[]>(['61984022596'])
  const [phoneInput, setPhoneInput] = useState<string>('')
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [loadingReadCsvFile, setLoadingReadCsvFile] = useState<boolean>(false)
  const [loadingSendMessages, setLoadingSendMessages] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>('')

  function onAddPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const phoneAlreadyExist = phones.find((phone) => phone === phoneInput)

    if (phoneAlreadyExist) return

    setPhones((oldPhones) => [...oldPhones, phoneInput])

    setPhoneInput('')
  }

  function handleSelectFile() {
    const input = document.createElement('input')

    input.type = 'file'

    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement

      const file = (target.files || [])[0] as File

      setCsvFile(file)
    }

    input.click()
  }

  function readCsvFile() {
    setLoadingReadCsvFile(true)

    setTimeout(() => {
      setPhones([
        // Dados fakes do .csv
        '61984022596',
        '61984022597',
        '61984022598',
        '61984022599',
        '61984022591',
      ])
    }, 3000)

    setLoadingReadCsvFile(false)
    setCsvFile(null)
  }

  async function onSendMessages(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingSendMessages(true)

    setTimeout(() => {
      setLoadingSendMessages(false)
      setPhones([])
    }, 3000)

    // await sendMessagesService({
    //   phones,
    //   messageText,
    // })
  }

  function handleRemovePhone(phone: string) {
    const newListPhones = phones.filter((oldPhone) => oldPhone !== phone)

    setPhones(newListPhones)
  }

  const sendMessagesButtonDisabled = phones.length === 0 || loadingSendMessages

  return (
    <div className={style.sendMessagesContainer}>
      <section className={style.phonesContainer}>
        {csvFile ? (
          <div className={style.selectedFileContainer}>
            <b>{csvFile.name}</b>

            <button
              type="button"
              onClick={readCsvFile}
              className={style.readFileButton}
            >
              Ler arquivo
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={style.selectFileButton}
            onClick={handleSelectFile}
          >
            Selecionar .csv
          </button>
        )}

        <form onSubmit={onAddPhone} className={style.addPhoneForm}>
          <CustomTextField
            size="small"
            label="Telefone"
            placeholder="Digite o telefone"
            value={phoneInput}
            className={style.input}
            disabled={loadingReadCsvFile}
            onChange={(event) => {
              setPhoneInput(event.target.value)
            }}
          />

          <button
            disabled={loadingReadCsvFile || phoneInput === ''}
            type="submit"
            className={style.addNewPhoneButton}
          >
            <FontAwesomeIcon icon={faPlus} className={style.icon} />
          </button>
        </form>

        {loadingReadCsvFile ? (
          <Loading />
        ) : (
          <ul className={style.phonesList}>
            {phones.map((phone) => {
              return (
                <li key={phone} className={style.phoneItem}>
                  <b>{phone}</b>

                  <button
                    onClick={() => {
                      handleRemovePhone(phone)
                    }}
                    className={style.removePhoneButton}
                  >
                    <FontAwesomeIcon icon={faTrash} className={style.icon} />
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <Divider className={style.divider} flexItem orientation="vertical" />

      <form onSubmit={onSendMessages} className={style.messageForm}>
        <CustomTextField
          label="Mensagem"
          placeholder="Digite a mensagem que deseja enviar"
          multiline
          rows={10}
          value={messageText}
          onChange={(event) => {
            setMessageText(event.target.value)
          }}
        />

        <button
          type="submit"
          className={style.sendMessagesButton}
          disabled={sendMessagesButtonDisabled}
        >
          {loadingSendMessages ? <Loading /> : 'Enviar mensagens'}
        </button>
      </form>
    </div>
  )
}
