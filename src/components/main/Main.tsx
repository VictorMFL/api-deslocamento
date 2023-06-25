import { useState, useEffect } from 'react'

import axios from 'axios'

import { Container, Grid } from '@mui/material'

// componente card
import Card from '../card/Card'

import { ConductorProps, VehicleProps } from '../../interface/interface'

export default function Main() {
  const [conductorData, setConductorData] = useState<ConductorProps[]>([])
  const [vehicleData, setVehicleData] = useState<VehicleProps[]>([])
  //
  //
  //
  //
  //
  // LEMBRE DE TROCAR O IF DA HOME!!!!
  //
  //
  //
  //
  //

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
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--gray-100)',
          marginTop: '5px',
        }}
      >
        <Grid container spacing={2}>
          {conductorData.map((item, index) => (
            <Grid item xs={4} key={index}>
              <Card
                name={item.nome}
                cnh={item.categoriaHabilitacao}
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
