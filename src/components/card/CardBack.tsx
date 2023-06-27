import { useState } from 'react'

import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material'

import { MdDelete } from 'react-icons/md'

import { CardProps } from '../../interface/interface'

import ModalDelete from '../modals/ModalDelete'

export default function CardBack({
  cnh,
  brandCar,
  kmActual,
  fabrication,
  numCnh,
  maturityCnh,
  idConductor,
  idVehicle,
  virou,
  update,
}: CardProps) {
  const [modalDelete, setModalDelete] = useState(false)
  const openDelete = () => {
    window.localStorage.setItem('Excluir-condutor', String(idConductor))
    window.localStorage.setItem('Excluir-veiculo', String(idVehicle))
    setModalDelete(true)
  }
  const closeDelete = () => setModalDelete(false)
  return (
    <>
      <CardContent
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          placeItems: 'center',
        }}
      >
        <Box sx={{ mt: '10px' }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Motorista
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            CNH: {cnh}
          </Typography>
          <Typography variant="body2">
            Número da CNH: {numCnh}
            <br />
            Vencimento da CNH: {maturityCnh}
          </Typography>
        </Box>
        <Box style={{ marginLeft: '1rem' }}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Veículo
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Marca: {brandCar}
          </Typography>
          <Typography variant="body2">
            Fabricação: {fabrication}
            <br />
            KM atual: {kmActual}
          </Typography>
        </Box>
        <CardActions style={{ position: 'absolute', top: '-10px', right: '0' }}>
          <Button size="small" onClick={virou}>
            Voltar
          </Button>
        </CardActions>
        <CardActions
          style={{
            position: 'absolute',
            top: '-5px',
            left: '0',
          }}
        >
          <MdDelete
            size={24}
            color="#f44336"
            style={{ cursor: 'pointer' }}
            onClick={openDelete}
          />
        </CardActions>
      </CardContent>
      {modalDelete && (
        <ModalDelete
          modalDelete={modalDelete}
          closeDelete={closeDelete}
          update={update}
        />
      )}
    </>
  )
}
