import { useState, ChangeEvent, FormEvent } from 'react'

import axios from 'axios'

// Componentes do Material UI
import { Box, TextField, Button, Modal } from '@mui/material'

// Icones
import { BsPerson } from 'react-icons/bs'
import { FaIdCard } from 'react-icons/fa'

type CreateConductorProps = {
  createVehicle: boolean
  closeCreateVehicle: () => void
}

const postData = async (url: string, requestBody: any) => {
  try {
    const response = await axios.post(url, requestBody)

    const newData = response.data
    console.log(newData)
  } catch (error) {
    console.error('Falha ao criar novo Condutor', error)
    return false
  }
}

export default function ModalCreateVehicle({
  createVehicle,
  closeCreateVehicle,
}: CreateConductorProps) {
  const [plate, setPlate] = useState('') // placa
  const [brandCar, setBrandCar] = useState('') // marca/modelo
  const [fabrication, setFabrication] = useState('') // fabricação
  const [kmActual, setKmActual] = useState('') // km atual

  function plateChange({ target }: ChangeEvent<HTMLInputElement>) {
    setPlate(target.value)
  }
  function brandCarChange({ target }: ChangeEvent<HTMLInputElement>) {
    setBrandCar(target.value)
  }
  function fabricationChange({ target }: ChangeEvent<HTMLInputElement>) {
    setFabrication(target.value)
  }
  function kmActualChange({ target }: ChangeEvent<HTMLInputElement>) {
    setKmActual(target.value)
  }
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    post()
    closeCreateVehicle()
  }

  async function post() {
    const requestBody = {
      placa: plate,
      marcaModelo: brandCar,
      anoFabricacao: fabrication,
      kmAtual: kmActual,
    }

    try {
      const res = await postData(
        'https://api-deslocamento.herokuapp.com/api/v1/Veiculo',
        requestBody,
      )
      if (res) {
        console.log(res)
      }
    } catch (error) {
      console.error('Falha ao criar o recurso', error)
    }
  }
  return (
    <Modal
      keepMounted
      open={createVehicle}
      onClose={closeCreateVehicle}
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
              padding: '10px',
              position: 'relative',
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
                    label="Placa"
                    variant="outlined"
                    required
                    onChange={plateChange}
                    value={plate}
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
                    label="Marca/Modelo"
                    variant="outlined"
                    autoComplete="off"
                    required
                    onChange={brandCarChange}
                    value={brandCar}
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
                    label="Ano de fabricação"
                    variant="outlined"
                    type="number"
                    required
                    autoComplete="off"
                    onChange={fabricationChange}
                    value={fabrication}
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
                    label="Km atual"
                    variant="outlined"
                    type="number"
                    required
                    autoComplete="off"
                    onChange={kmActualChange}
                    value={kmActual}
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
