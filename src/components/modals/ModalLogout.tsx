import { useRouter } from 'next/navigation'

import { Modal, Box, Typography, Button } from '@mui/material'

type ModalLogoutProps = {
  modalLogout: boolean
  closeModalLogout: () => void
}

export default function ModalLogout({
  modalLogout,
  closeModalLogout,
}: ModalLogoutProps) {
  const router = useRouter()

  function Logout() {
    router.push('/')
    closeModalLogout()
    window.localStorage.clear()
  }

  return (
    <Modal
      keepMounted
      open={modalLogout}
      onClose={closeModalLogout}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box>
        <div className="modalContent">
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Deseja sair da conta?
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
              <Button variant="contained" onClick={closeModalLogout}>
                Voltar
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: 'red', marginLeft: '1rem' }}
                onClick={Logout}
              >
                Sair
              </Button>
            </div>
          </Typography>
        </div>
      </Box>
    </Modal>
  )
}
