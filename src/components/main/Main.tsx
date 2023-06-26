import { useState, useEffect } from 'react'

import axios from 'axios'

import { Container, Grid } from '@mui/material'

// componente card
import Card from '../card/Card'

import { ConductorProps, VehicleProps } from '../../interface/interface'

export default function Main() {
  const [conductorData, setConductorData] = useState<ConductorProps[]>([])
  const [vehicleData, setVehicleData] = useState<VehicleProps[]>([])

  async function getConductor() {
    try {
      const response = await axios.get(
        'https://api-deslocamento.herokuapp.com/api/v1/Condutor',
      )
      setConductorData(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function getVehicle() {
    try {
      const response = await axios.get(
        'https://api-deslocamento.herokuapp.com/api/v1/Veiculo',
      )
      setVehicleData(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getConductor()
    getVehicle()
  }, [])

  if (conductorData.length === 0) return null
  return (
    <main>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '90vh',
          padding: '2rem 0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--gray-100)',
          marginTop: '5px',
        }}
      >
        <h1 style={{ marginBottom: '1rem' }}>Motoristas</h1>
        <Grid container spacing={2}>
          {conductorData.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card
                idConductor={item.id}
                idVehicle={
                  vehicleData[index]?.id === undefined
                    ? 1000 // numero gande para poder não executar o PUT pois esse id não tem na API.
                    : vehicleData[index]?.id
                }
                name={item.nome}
                cnh={item.catergoriaHabilitacao}
                numCnh={item.numeroHabilitacao}
                maturityCnh={item.vencimentoHabilitacao}
                brandCar={
                  vehicleData[index]?.marcaModelo === undefined
                    ? 'N/D'
                    : vehicleData[index]?.marcaModelo
                }
                plate={
                  vehicleData[index]?.placa === undefined
                    ? 'N/D'
                    : vehicleData[index]?.placa
                }
                kmActual={
                  vehicleData[index]?.kmAtual === undefined
                    ? 'N/D'
                    : vehicleData[index]?.kmAtual
                }
                fabrication={
                  vehicleData[index]?.anoFabricacao === undefined
                    ? 'N/D'
                    : vehicleData[index]?.anoFabricacao
                }
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  )
}
