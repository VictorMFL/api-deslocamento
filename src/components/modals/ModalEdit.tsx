import { useState, FormEvent, ChangeEvent } from 'react'

import axios from 'axios'

import { Modal, Box, Typography, TextField, Button } from '@mui/material'

type ModalEditProps = {
  modalEdit: boolean
  closeModalEdit: () => void
  closePersonaldata: () => void
}

export default function ModalEdit({
  modalEdit,
  closeModalEdit,
  closePersonaldata,
}: ModalEditProps) {
  const nameLocal = window.localStorage.getItem('Nome') ?? ''
  const stateLocal = window.localStorage.getItem('UF') ?? ''
  const cityLocal = window.localStorage.getItem('Cidade') ?? ''
  const neighborhoodLocal = window.localStorage.getItem('Cidade') ?? ''
  const numberLocal = window.localStorage.getItem('Numero') ?? ''
  const publicPlaceLocal = window.localStorage.getItem('Bairro') ?? ''

  const documentNumber = window.localStorage.getItem('Num-documento')

  const [name, setName] = useState<string>(nameLocal)
  const [federativeUnit, setFederativeUnit] = useState<string>(stateLocal)
  const [city, setCity] = useState<string>(cityLocal)
  const [neighborhood, setNeighborhood] = useState<string>(neighborhoodLocal) // bairro
  const [number, setNumber] = useState<string>(numberLocal)
  const [publicPlace, setPublicPlace] = useState<string>(publicPlaceLocal)

  function nameChange({ target }: ChangeEvent<HTMLInputElement>) {
    setName(target.value)
  }
  function federativeUnitChange({ target }: ChangeEvent<HTMLInputElement>) {
    setFederativeUnit(target.value)
  }
  function cityChange({ target }: ChangeEvent<HTMLInputElement>) {
    setCity(target.value)
  }
  function neighborhoodChange({ target }: ChangeEvent<HTMLInputElement>) {
    setNeighborhood(target.value)
  }
  function numberChange({ target }: ChangeEvent<HTMLInputElement>) {
    setNumber(target.value)
  }
  function publicPlaceChange({ target }: ChangeEvent<HTMLInputElement>) {
    setPublicPlace(target.value)
  }

  async function put() {
    const idLocal = window.localStorage.getItem('Id') // Obtém o ID do usuário a ser atualizado

    const dados = {
      id: idLocal,
      nome: name,
      uf: federativeUnit,
      cidade: city,
      bairro: neighborhood,
      numero: number,
      logradouro: publicPlace,
    }

    try {
      const response = await axios.put(
        `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${idLocal}`,
        dados,
      )
      console.log('Usuário atualizado:', response.data)
      console.log(response.data)
      window.localStorage.setItem('Nome', name)
      window.localStorage.setItem('UF', federativeUnit)
      window.localStorage.setItem('Cidade', city)
      window.localStorage.setItem('Numero', number)
      window.localStorage.setItem('Bairro', neighborhood)
      window.localStorage.setItem('Logradouro', publicPlace)
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    put()
    closeModalEdit()
    closePersonaldata()
  }

  return (
    <Modal
      keepMounted
      open={modalEdit}
      onClose={closeModalEdit}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box>
        <div className="modalContent">
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Editar
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <div className="content">
              <form
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
                onSubmit={handleSubmit}
              >
                <TextField
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  value={name}
                  onChange={nameChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Estado"
                  variant="outlined"
                  value={federativeUnit}
                  onChange={federativeUnitChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Cidade"
                  variant="outlined"
                  value={city}
                  onChange={cityChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Bairro"
                  variant="outlined"
                  value={neighborhood}
                  onChange={neighborhoodChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Número"
                  variant="outlined"
                  value={number}
                  onChange={numberChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Logradouro"
                  variant="outlined"
                  value={publicPlace}
                  onChange={publicPlaceChange}
                />
                <TextField
                  id="outlined-basic"
                  label="Número documento"
                  disabled
                  value={documentNumber}
                  variant="outlined"
                />
                <Button variant="outlined" type="submit">
                  Confirmar
                </Button>
              </form>
            </div>
          </Typography>
        </div>
      </Box>
    </Modal>
  )
}
