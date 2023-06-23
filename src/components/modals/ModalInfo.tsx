import { Modal, Box, Typography } from '@mui/material'

type ModalInfoProps = {
  modalInfo: boolean
  closeModalInfo: () => void
}

export default function ModalInfo({
  modalInfo,
  closeModalInfo,
}: ModalInfoProps) {
  const name = window.localStorage.getItem('Nome')

  return (
    <Modal
      keepMounted
      open={modalInfo}
      onClose={closeModalInfo}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box>
        <div className="modalContent">
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Informações de login
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <div className="content">
              <p>Faça login com seu nome de usuário.</p>
              <p style={{ textAlign: 'center', marginTop: '10px' }}>{name}</p>
            </div>
          </Typography>
        </div>
      </Box>
    </Modal>
  )
}
