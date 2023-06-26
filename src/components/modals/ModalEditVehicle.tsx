import { useState, ChangeEvent, FormEvent } from 'react'

import axios from 'axios'

import { Modal, Button, Typography, TextField } from '@mui/material'

type ModalEditVehicleProps = {
  modalEditVehicle: boolean
  closeEditVehicle: () => void
  closeEditMain: () => void
}

export default function ModalEditVehicle({
  modalEditVehicle,
  closeEditVehicle,
  closeEditMain,
}: ModalEditVehicleProps) {
  const plate = window.localStorage.getItem('Placa')
  const brandCarLocal = window.localStorage.getItem('Marca-carro') ?? ''
  const fabricationLocal = window.localStorage.getItem('Fabricacao') ?? ''
  const kmActualLocal = window.localStorage.getItem('Km-atual') ?? ''

  const [brandCar, setBrandCar] = useState(brandCarLocal)
  const [fabrication, setFabrication] = useState(fabricationLocal)
  const [kmActual, setKmActual] = useState(kmActualLocal)

  function brandCarChange({ target }: ChangeEvent<HTMLInputElement>) {
    setBrandCar(target.value)
  }
  function fabricationChange({ target }: ChangeEvent<HTMLInputElement>) {
    setFabrication(target.value)
  }
  function kmActualChange({ target }: ChangeEvent<HTMLInputElement>) {
    setKmActual(target.value)
  }

  async function put() {
    const idLocal = window.localStorage.getItem('Id-veiculo') // Obtém o ID do veículo a ser atualizado

    const dados = {
      id: idLocal,
      marcaModelo: brandCar,
      anoFabricacao: fabrication,
      kmAtual: kmActual,
    }

    try {
      const response = await axios.put(
        `https://api-deslocamento.herokuapp.com/api/v1/Veiculo/${idLocal}`,
        dados,
      )
      console.log('Veículo atualizado:', response.data)
      console.log(response.data)
    } catch (error) {
      console.error('Erro ao atualizar condutor:', error)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    put()
    closeEditVehicle()
    closeEditMain()
  }

  return (
    <Modal
      keepMounted
      open={modalEditVehicle}
      onClose={closeEditVehicle}
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
              <TextField label="Placa" value={plate} disabled />
              <TextField
                label="Marca/Modelo"
                value={brandCar}
                onChange={brandCarChange}
              />
              <TextField
                label="Ano de fabricação"
                value={fabrication}
                onChange={fabricationChange}
              />
              <TextField
                label="KM atual"
                value={kmActual}
                onChange={kmActualChange}
              />
            </div>
          </Typography>
          <Button
            variant="contained"
            type="submit"
            style={{ marginTop: '1rem' }}
          >
            Enviar
          </Button>
        </div>
      </form>
    </Modal>
  )
}
