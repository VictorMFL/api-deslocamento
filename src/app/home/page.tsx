'use client'
import { useState, useEffect } from 'react'

import axios from 'axios'

import Header from '@/components/header/Header'

import { ClientProps } from '@/interface/interface'

export default function Home() {
  const [data, setData] = useState<ClientProps[]>([])

  async function get() {
    const id = window.localStorage.getItem('Id')
    try {
      const response = await axios.get(
        `https://api-deslocamento.herokuapp.com/api/v1/Cliente/${id}`,
      )
      setData(response.data)
      const name = response.data.nome
      const uf = response.data.uf
      const city = response.data.cidade
      const documentNumber = response.data.numeroDocumento
      const documentType = response.data.tipoDocumento
      const number = response.data.numero
      const neighborhood = response.data.bairro
      const publicPlace = response.data.logradouro
      window.localStorage.setItem('Nome', name)
      window.localStorage.setItem('UF', uf)
      window.localStorage.setItem('Cidade', city)
      window.localStorage.setItem('Num-documento', documentNumber)
      window.localStorage.setItem('Tipo-documento', documentType)
      window.localStorage.setItem('Numero', number)
      window.localStorage.setItem('Bairro', neighborhood)
      window.localStorage.setItem('Logradouro', publicPlace)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    get()
  }, [])

  if (data.length === 0) return null
  return (
    <>
      <Header />
      <p>Home</p>
    </>
  )
}
