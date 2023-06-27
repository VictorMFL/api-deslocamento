import { useState } from 'react'

import { Modal, Box, Typography, Button } from '@mui/material'

import ModalEditConductor from './ModalEditConductor'
import ModalEditVehicle from './ModalEditVehicle'

type ModalEditMainProps = {
  modalEdit: boolean
  closeEditMain: () => void
  update: () => void
}

export default function ModalEditMain({
  modalEdit,
  closeEditMain,
  update,
}: ModalEditMainProps) {
  const idVehicle = window.localStorage.getItem('Id-veiculo')
  const [modalEditConductor, setModalEditConductor] = useState(false)
  const openEditConductor = () => setModalEditConductor(true)
  const closeEditConductor = () => setModalEditConductor(false)

  const [modalEditVehicle, setModalEditVehicle] = useState(false)
  const openEditVehicle = () => setModalEditVehicle(true)
  const closeEditVehicle = () => setModalEditVehicle(false)
  return (
    <>
      <Modal
        keepMounted
        open={modalEdit}
        onClose={closeEditMain}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box>
          <div className="modalContent">
            <Typography
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
            >
              Deseja editar qual?
            </Typography>
            <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
              <div
                className="content"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Button // ESTÁ DESABILITADO POIS O PUT PARA ALTERAR O CONDUTOR NÃO ESTÁ FUNCIONANDO NO MOMENTO
                  variant="contained"
                  onClick={openEditConductor}
                  disabled
                >
                  Motorista {"'Não disponível'"}
                </Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: '1rem' }}
                  onClick={openEditVehicle}
                  disabled={idVehicle === '1000'}
                >
                  Veículo
                </Button>
              </div>
            </Typography>
          </div>
        </Box>
      </Modal>
      {modalEditConductor && (
        <ModalEditConductor
          modalEditConductor={modalEditConductor}
          closeEditConductor={closeEditConductor}
          update={update}
        />
      )}
      {modalEditVehicle && (
        <ModalEditVehicle
          modalEditVehicle={modalEditVehicle}
          closeEditVehicle={closeEditVehicle}
          closeEditMain={closeEditMain}
          update={update}
        />
      )}
    </>
  )
}
