import { CustomTextField } from '@/components/_ui/CustomTextField'
import style from './SendMessages.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FormEvent, useState } from 'react'
import { Divider } from '@mui/material'
import { Loading } from '@/components/_ui/Loading'

export function SendMessagesComponent() {
  const [phones, setPhones] = useState<string[]>([])
  const [phoneInput, setPhoneInput] = useState<string>('')
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [loadingReadCsvFile, setLoadingReadCsvFile] = useState<boolean>(false)

  function onAddPhone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

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

    setTimeout(() => {}, 3000)

    setLoadingReadCsvFile(false)
  }

  return (
    <div>
      <section className={style.phonesContainer}>
        {csvFile ? (
          <div>
            <b>{csvFile.name}</b>
            <button type="button" onClick={readCsvFile}>
              Importar
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
            disabled={loadingReadCsvFile}
            onChange={(event) => {
              setPhoneInput(event.target.value)
            }}
          />

          <button
            disabled={loadingReadCsvFile}
            type="button"
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

                  <FontAwesomeIcon icon={faTrash} className={style.icon} />
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <Divider flexItem orientation="vertical" />

      <section className={style.messageContainer}>
        <CustomTextField
          label="Mensagem"
          placeholder="Digite a mensagem que deseja enviar"
          multiline
          rows={5}
        />
        <button type="button" className={style.sendMessagesButton}>
          Enviar
        </button>
      </section>
    </div>
  )
}
