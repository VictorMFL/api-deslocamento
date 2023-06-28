import { useState, ChangeEvent, FormEvent } from 'react'

import axios from 'axios'

// Componentes do Material UI
import { Box, TextField, Button, Modal } from '@mui/material'

// Icones
import { BsPerson } from 'react-icons/bs'
import { FaIdCard } from 'react-icons/fa'

type CreateConductorProps = {
  createConductor: boolean
  closeCreateConductor: () => void
  update: () => void
}

const postData = async (url: string, requestBody: any) => {
  try {
    const response = await axios.post(url, requestBody)
    console.log('condutor criado' + response.data)
  } catch (error) {
    console.error('Falha ao criar novo Condutor', error)
    return false
  }
}

export default function ModalCreateConductor({
  createConductor,
  closeCreateConductor,
  update,
}: CreateConductorProps) {
  const [name, setName] = useState('') // nome do usuário
  const [cnhNumber, setCnhNumber] = useState('') // número da CNH
  const [categoryCnh, setCategoryCnh] = useState('') // categoria da CNH

  function nameChange({ target }: ChangeEvent<HTMLInputElement>) {
    setName(target.value)
  }
  function cnhNumberChange({ target }: ChangeEvent<HTMLInputElement>) {
    setCnhNumber(target.value)
  }
  function categoryCnhChange({ target }: ChangeEvent<HTMLInputElement>) {
    setCategoryCnh(target.value)
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    post()
    closeCreateConductor()
  }

  async function post() {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString()
    const requestBody = {
      nome: name,
      numeroHabilitacao: cnhNumber,
      categoriaHabilitacao: categoryCnh,
      vencimentoHabilitacao: formattedDate,
    }

    try {
      const res = await postData(
        'https://api-deslocamento.herokuapp.com/api/v1/Condutor',
        requestBody,
      )
      update()
      if (res) {
        console.log(res)
      }
      return true
    } catch (error) {
      console.error('Falha ao criar o recurso', error)
      return false
    }
  }
  return (
    <Modal
      keepMounted
      open={createConductor}
      onClose={closeCreateConductor}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="modalContent">
          <Box
            sx={{
              backgroundColor: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              borderRadius: '20px',
              position: 'relative',
              minWidth: '250px',
            }}
          >
            <p style={{ textAlign: 'center', marginBottom: '10px' }}>
              Preencha o formulário
            </p>
            <form onSubmit={handleSubmit}>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0.5rem 1rem',
                  }}
                >
                  <BsPerson size={32} style={{ margin: '0 10px' }} />
                  <TextField
                    id="outlined-basic"
                    label="Nome"
                    variant="outlined"
                    required
                    onChange={nameChange}
                    value={name}
                  />
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0.5rem 1rem',
                  }}
                >
                  <FaIdCard size={32} style={{ margin: '0 10px' }} />
                  <TextField
                    id="outlined-basic"
                    label="Número da CNH"
                    variant="outlined"
                    autoComplete="off"
                    required
                    onChange={cnhNumberChange}
                    value={cnhNumber}
                  />
                </Box>

                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: '0.5rem 1rem',
                  }}
                >
                  <FaIdCard size={32} style={{ margin: '0 10px' }} />
                  <TextField
                    id="outlined-basic"
                    label="Categoria da CNH"
                    variant="outlined"
                    required
                    autoComplete="off"
                    onChange={categoryCnhChange}
                    value={categoryCnh}
                  />
                </Box>
              </Box>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '1rem',
                  marginBottom: '2rem',
                }}
              >
                <Button variant="contained" type="submit">
                  Confirmar
                </Button>
              </div>
            </form>
          </Box>
        </div>
      </Box>
    </Modal>
  )
}
