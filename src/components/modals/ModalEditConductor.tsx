import { useState, ChangeEvent, FormEvent } from 'react'

import axios from 'axios'

import { Modal, Button, Typography, TextField } from '@mui/material'

import { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

type ModalEditMainProps = {
  modalEditConductor: boolean
  closeEditConductor: () => void
}

export default function ModalEditMain({
  modalEditConductor,
  closeEditConductor,
}: ModalEditMainProps) {
  const name = window.localStorage.getItem('Nome-condutor')
  const numCnh = window.localStorage.getItem('Num-cnh')
  const catCnhLocal = window.localStorage.getItem('Cat-cnh') ?? '' //  categoria da CNH

  const [catCnh, setCatCnh] = useState<string>(catCnhLocal)
  const [venCnh, setVenCnh] = useState<Dayjs | null>(null)

  function catCnhChange({ target }: ChangeEvent<HTMLInputElement>) {
    setCatCnh(target.value)
  }

  async function put() {
    const idLocal = window.localStorage.getItem('Id-condutor') // Obtém o ID do condutor a ser atualizado

    const dados = {
      id: idLocal,
      catergoriaHabilitacao: catCnh,
      vencimentoHabilitacao: venCnh,
    }

    try {
      const response = await axios.put(
        `https://api-deslocamento.herokuapp.com/api/v1/Condutor/${idLocal}`,
        dados,
      )
      console.log('Condutor atualizado:', response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao atualizar condutor:', error)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    put()
  }

  return (
    <Modal
      keepMounted
      open={modalEditConductor}
      onClose={closeEditConductor}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <div className="modalContent">
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Formulário
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <div
              className="content"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <TextField label="Nome" value={name} disabled />
              <TextField label="Número CNH" value={numCnh} disabled />
              <TextField
                label="Categoria CNH"
                value={catCnh}
                onChange={catCnhChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    value={venCnh}
                    onChange={(newValue) => setVenCnh(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
          </Typography>
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
