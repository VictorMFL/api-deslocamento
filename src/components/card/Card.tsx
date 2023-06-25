import { useState } from 'react'

import { Box } from '@mui/material'

import { CardProps } from '../../interface/interface'

// cards
import CardFront from './CardFront'
import CardBack from './CardBack'

export default function Card({
  name,
  cnh,
  brandCar,
  plate,
  kmActual,
  fabrication,
  numCnh,
  maturityCnh,
}: CardProps) {
  const [virarCard, setVirarCard] = useState(false)
  function virou() {
    setVirarCard(!virarCard)
  }
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        position: 'relative',
      }}
      className={virarCard ? 'back_card' : 'front_card'}
    >
      {virarCard ? (
        <CardBack
          cnh={cnh}
          brandCar={brandCar}
          plate={plate}
          kmActual={kmActual}
          fabrication={fabrication}
          numCnh={numCnh}
          maturityCnh={maturityCnh}
          virou={virou}
        />
      ) : (
        <CardFront
          name={name}
          cnh={cnh}
          brandCar={brandCar}
          plate={plate}
          virou={virou}
        />
      )}
    </Box>
  )
}
