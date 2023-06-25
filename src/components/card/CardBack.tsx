import {
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material'

import { CardProps } from '../../interface/interface'

export default function CardBack({
  cnh,
  brandCar,
  kmActual,
  fabrication,
  numCnh,
  maturityCnh,
  virou,
}: CardProps) {
  return (
    <>
      <CardContent
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          placeItems: 'center',
        }}
      >
        <Box>
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
      </CardContent>
    </>
  )
}
