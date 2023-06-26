import { useState } from 'react'

import { CardContent, Typography, CardActions, Button } from '@mui/material'

// icones
import { RiAccountCircleLine } from 'react-icons/ri'
import { CiEdit } from 'react-icons/ci'

import { CardProps } from '../../interface/interface'

import ModalEditMain from '../modals/ModalEditMain'

export default function CardFront({
  name,
  cnh,
  numCnh,
  maturityCnh,
  brandCar,
  plate,
  idConductor,
  idVehicle,
  fabrication,
  kmActual,
  virou,
}: CardProps) {
  const [modalEdit, setModalEdit] = useState(false)
  const openEditMain = () => {
    setModalEdit(true)
    window.localStorage.setItem('Id-condutor', String(idConductor))
    window.localStorage.setItem('Nome-condutor', String(name))
    window.localStorage.setItem('Num-cnh', String(numCnh))
    window.localStorage.setItem('Cat-cnh', cnh)
    window.localStorage.setItem('Ven-cnh', String(maturityCnh))
    window.localStorage.setItem('Id-veiculo', String(idVehicle))
    window.localStorage.setItem('Placa', String(plate))
    window.localStorage.setItem('Marca-carro', String(brandCar))
    window.localStorage.setItem('Fabricacao', String(fabrication))
    window.localStorage.setItem('Km-atual', String(kmActual))
  }
  const closeEditMain = () => setModalEdit(false)

  return (
    <>
      <RiAccountCircleLine size={64} />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Motorista
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          CNH: {cnh}
        </Typography>
        <Typography variant="body2">
          Carro: {brandCar}
          <br />
          Placa: {plate}
        </Typography>
      </CardContent>
      <CardActions style={{ position: 'absolute', top: '-10px', right: '0' }}>
        <Button size="small" onClick={virou}>
          Ver mais
        </Button>
      </CardActions>
      <CardActions style={{ position: 'absolute', top: '-5px', left: '0' }}>
        <CiEdit
          size={24}
          style={{ cursor: 'pointer' }}
          title="editar"
          onClick={openEditMain}
        />
      </CardActions>
      {modalEdit && (
        <ModalEditMain modalEdit={modalEdit} closeEditMain={closeEditMain} />
      )}
    </>
  )
}
