'use client'

import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

import axios from 'axios'

import styles from './LoginPage.module.css'

// Componentes do Material UI
import { Container, Box, TextField, Button } from '@mui/material'

// Icone
import { BsPerson } from 'react-icons/bs'

// Rotas
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Props da API
import { ClientProps } from '../interface/interface'

export default function LoginPage() {
  const [user, setUser] = useState('')
  const [erro, setErro] = useState<boolean | undefined>(undefined)
  const [data, setData] = useState<ClientProps[]>([])

  const router = useRouter()

  function handleChange({ target }: ChangeEvent<HTMLInputElement>) {
    setUser(target.value)
    setErro(undefined)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const filteredData = data.filter((item) => item.nome === user) // verifica se o nome de usuário digitado já está cadastrado na API
    if (filteredData.length === 0) {
      setErro(true)
    } else {
      const id = String(filteredData[0].id) // pega o id do usuário para fazer o GET para a API
      window.localStorage.setItem('Id', id)
      router.push('/home')
    }
  }

  async function get() {
    try {
      const response = await axios.get(
        'https://api-deslocamento.herokuapp.com/api/v1/Cliente',
      )
      setData(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get()
  }, [])

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
            width: 400,
            height: 300,
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
          <h1>Login</h1>
          <p style={{ textAlign: 'center' }}>
            Para fazer login basta colocar seu nome de usuário
          </p>
          <form onSubmit={handleSubmit}>
            <div className={styles.container_input}>
              <BsPerson size={32} />
              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                required
                onChange={handleChange}
                value={user}
                error={erro} // Adiciona a classe de erro quando 'erro' for true
                helperText={erro && 'Usuário não encontrado'}
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '1rem',
              }}
            >
              <Button
                variant="contained"
                type="submit"
                style={{ marginBottom: '2rem' }}
              >
                Login
              </Button>
            </div>
          </form>
          <p className={styles.register}>
            Não possui uma conta? <Link href="/cadastro">Registre-se</Link>
          </p>
        </Box>
      </Container>
    </div>
  )
}
