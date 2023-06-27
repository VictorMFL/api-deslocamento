import { useState, useEffect, useRef } from 'react'

import axios from 'axios'

import { Container, Grid, Fab, Popover } from '@mui/material'

// componente card
import Card from '../card/Card'

import { ConductorProps, VehicleProps } from '../../interface/interface'

// icones
import { BsPersonPlusFill } from 'react-icons/bs'
import { AiOutlineCar } from 'react-icons/ai'

import ModalCreateConductor from '../modals/ModalCreateConductor'
import ModalCreateVehicle from '../modals/ModalCreateVehicle'

import Login from '../login/Login'

export default function Main() {
  const [att, setAtt] = useState(false)

  const update = () => setAtt(!att) // atualiza od cards

  const [conductorData, setConductorData] = useState<ConductorProps[]>([])
  const [vehicleData, setVehicleData] = useState<VehicleProps[]>([])
  const [openAdd, setOpenAdd] = useState(false)
  const anchorRef = useRef(null)

  function openCreate() {
    setOpenAdd(true)
  }

  function closeCreate() {
    setOpenAdd(false)
  }

  // modal
  const [createConductor, setCreateConductor] = useState(false)
  const openCreateConductor = () => setCreateConductor(true)
  const closeCreateConductor = () => setCreateConductor(false)

  const [createVehicle, setCreateVehicle] = useState(false)
  const openCreateVehicle = () => setCreateVehicle(true)
  const closeCreateVehicle = () => setCreateVehicle(false)

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
  }, [att])

  if (conductorData.length === 0) return <Login />
  return (
    <main>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: '90vh',
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: ' #1e88e5',
          marginTop: '3px',
        }}
      >
        <h1 style={{ marginBottom: '1rem' }}>Motoristas</h1>
        <Grid container spacing={2}>
          {conductorData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                update={update}
                idConductor={item.id}
                idVehicle={
                  vehicleData[index]?.id === undefined
                    ? 1000 // numero grande para poder não executar o PUT pois esse id não tem na API.
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
      <Fab
        ref={anchorRef}
        title="Criar"
        color="primary"
        aria-label="add"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          fontSize: '2rem',
        }}
        onClick={openCreate}
      >
        +
      </Fab>
      <Popover
        open={openAdd}
        anchorEl={anchorRef.current}
        onClose={closeCreate}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div
          style={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <p>Crie novos Condutores e Veículos</p>
          <BsPersonPlusFill
            size={32}
            title="Criar novo condutor"
            style={{ cursor: 'pointer' }}
            onClick={openCreateConductor}
          />
          <AiOutlineCar
            size={32}
            title="Criar novo veículo"
            onClick={openCreateVehicle}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </Popover>
      {createConductor && (
        <ModalCreateConductor
          createConductor={createConductor}
          closeCreateConductor={closeCreateConductor}
          update={update}
        />
      )}
      {createVehicle && (
        <ModalCreateVehicle
          createVehicle={createVehicle}
          closeCreateVehicle={closeCreateVehicle}
          update={update}
        />
      )}
    </main>
  )
}
