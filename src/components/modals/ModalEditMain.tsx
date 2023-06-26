import { useState } from 'react'

import { Modal, Box, Typography, Button } from '@mui/material'

import ModalEditConductor from './ModalEditConductor'

type ModalEditMainProps = {
  modalEdit: boolean
  closeEditMain: () => void
}

export default function ModalEditMain({
  modalEdit,
  closeEditMain,
}: ModalEditMainProps) {
  const [modalEditConductor, setModalEditConductor] = useState(false)
  const openEditConductor = () => setModalEditConductor(true)
  const closeEditConductor = () => setModalEditConductor(false)
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
                <Button variant="contained" onClick={openEditConductor}>
                  Motorista
                </Button>
                <Button variant="contained" style={{ marginLeft: '1rem' }}>
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
        />
      )}
    </>
  )
}
