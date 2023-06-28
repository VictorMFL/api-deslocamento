'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

import axios from 'axios'

import styles from './Cadastro.module.css'

// Componentes do Material UI
import {
  Container,
  Box,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'

// Icones
import { BsPerson } from 'react-icons/bs'
import { FaCity, FaHome, FaIdCard } from 'react-icons/fa'

// Rotas
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Props da API
import { ClientProps } from '../../interface/interface'

export default function LoginPage() {
  const [documentNumber, setDocumentNumber] = useState('') // número do documento
  const [documentType, setDocumentType] = useState('CPF') // tipo de documento
  const [name, setName] = useState('') // nome do usuário
  const [publicPlace, setPublicPlace] = useState('') // logradouro
  const [number, setNumber] = useState('') // número
  const [neighborhood, setNeighborhood] = useState('') // bairro
  const [city, setCity] = useState('') // cidade
  const [federativeUnit, setFederativeUnit] = useState('') // uf

  const router = useRouter()

  function documentNumberChange({ target }: ChangeEvent<HTMLInputElement>) {
    setDocumentNumber(target.value)
  }
  function documentTypeChange({ target }: SelectChangeEvent<string>) {
    setDocumentType(target.value)
  }
  function nameChange({ target }: ChangeEvent<HTMLInputElement>) {
    setName(target.value)
  }
  function publicPlaceChange({ target }: ChangeEvent<HTMLInputElement>) {
    setPublicPlace(target.value)
  }
  function numberChange({ target }: ChangeEvent<HTMLInputElement>) {
    setNumber(target.value)
  }
  function neighborhoodChange({ target }: ChangeEvent<HTMLInputElement>) {
    setNeighborhood(target.value)
  }
  function cityChange({ target }: ChangeEvent<HTMLInputElement>) {
    setCity(target.value)
  }
  function federativeUnitChange({ target }: ChangeEvent<HTMLInputElement>) {
    setFederativeUnit(target.value)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    post()
    router.push('/home')
  }

  async function post() {
    const dados: ClientProps = {
      numeroDocumento: documentNumber,
      tipoDocumento: documentType,
      nome: name,
      logradouro: publicPlace,
      numero: number,
      bairro: neighborhood,
      cidade: city,
      uf: federativeUnit,
    }
    try {
      const response = await axios.post(
        'https://api-deslocamento.herokuapp.com/api/v1/Cliente',
        dados,
      )
      const data = response.data
      window.localStorage.setItem('Id', data) // guarda o id do usuário criado
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.bg}>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
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
          <h1>Cadastro</h1>
          <p style={{ textAlign: 'center', marginBottom: '10px' }}>
            Preencha o formulário
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.container_form}>
              <div className={styles.container_input}>
                <BsPerson size={32} style={{ margin: '0 10px' }} />
                <TextField
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  required
                  onChange={nameChange}
                  value={name}
                />
              </div>

              <div className={styles.document_type}>
                <InputLabel id="demo-simple-select-label">
                  Tipo de documento
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={documentType}
                  label="Documento"
                  required
                  onChange={documentTypeChange}
                  style={{
                    width: '100%',
                  }}
                >
                  <MenuItem value="CPF" selected>
                    CPF
                  </MenuItem>
                  <MenuItem value="RG">RG</MenuItem>
                </Select>
              </div>

              <div className={styles.container_input}>
                <FaIdCard size={32} style={{ margin: '0 10px' }} />
                <TextField
                  id="outlined-basic"
                  label={
                    documentType === 'CPF' ? '000.000.000-00' : '00.000.000-0'
                  }
                  variant="outlined"
                  autoComplete="off"
                  required
                  onChange={documentNumberChange}
                  value={documentNumber}
                />
              </div>

              <div className={styles.container_input}>
                <FaCity size={32} style={{ margin: '0 10px' }} />
                <TextField
                  id="outlined-basic"
                  label="Estado"
                  variant="outlined"
                  required
                  autoComplete="off"
                  onChange={federativeUnitChange}
                  value={federativeUnit}
                />
              </div>

              <div className={styles.container_input}>
                <FaCity size={32} style={{ margin: '0 10px' }} />
                <TextField
                  id="outlined-basic"
                  label="Cidade"
                  variant="outlined"
                  required
                  autoComplete="off"
                  onChange={cityChange}
                  value={city}
                />
              </div>

              <div className={styles.container_input}>
                <FaCity size={32} style={{ margin: '0 10px' }} />
                <TextField
                  id="outlined-basic"
                  label="Bairro"
                  variant="outlined"
                  required
                  autoComplete="off"
                  onChange={neighborhoodChange}
                  value={neighborhood}
                />
              </div>

              <div className={styles.container_input}>
                <FaHome size={32} style={{ margin: '0 10px' }} />
                <TextField
                  id="outlined-basic"
                  label="Número"
                  variant="outlined"
                  autoComplete="off"
                  onChange={numberChange}
                  value={number}
                />
              </div>

              <div className={styles.container_input}>
                <FaHome size={32} style={{ margin: '0 10px' }} />
                <TextField
                  id="outlined-basic"
                  label="Logradouro"
                  variant="outlined"
                  placeholder="Ex: Casa"
                  autoComplete="off"
                  onChange={publicPlaceChange}
                  value={publicPlace}
                />
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
                marginBottom: '2rem',
              }}
            >
              <Button variant="contained" type="submit">
                Cadastrar-se
              </Button>
            </div>
          </form>
          <p className={styles.register}>
            Já possui uma conta? <Link href="/">Entrar</Link>
          </p>
        </Box>
      </Container>
    </div>
  )
}
