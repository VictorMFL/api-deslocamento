import { CardContent, Typography, CardActions, Button } from '@mui/material'

import { RiAccountCircleLine } from 'react-icons/ri'

import { CardProps } from '../../interface/interface'

export default function CardFront({
  name,
  cnh,
  brandCar,
  plate,
  virou,
}: CardProps) {
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
    </>
  )
}
