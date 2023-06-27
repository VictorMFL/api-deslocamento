import axios from 'axios'

import { useRouter } from 'next/navigation'

import { Modal, Box, Typography, Button } from '@mui/material'

type DeleteUserProps = {
  modalDelete: boolean
  closeModalDelete: () => void
}

const deleteData = async (url: string, id: number) => {
  try {
    await axios.delete(`${url}/${id}`, {
      data: { id },
    })
    console.log('Item excluído')
  } catch (error) {
    console.error('Falha ao excluir', error)
    return false
  }
}

export default function ModalDeleteUser({
  modalDelete,
  closeModalDelete,
}: DeleteUserProps) {
  const router = useRouter()

  async function deleteUser() {
    const id = window.localStorage.getItem('Id')
    try {
      const res = await deleteData(
        'https://api-deslocamento.herokuapp.com/api/v1/Cliente',
        Number(id),
      )
      closeModalDelete()
      console.log(res)
      if (res) {
        router.push('/')
      }
    } catch (error) {
      console.error('Falha ao deletar o cliente', error)
    }
  }

  return (
    <Modal
      keepMounted
      open={modalDelete}
      onClose={closeModalDelete}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box>
        <div className="modalContent">
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Deseja excluir a sua conta?
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <div
              className="content"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Button variant="contained" onClick={closeModalDelete}>
                Não
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: '1rem' }}
                color="error"
                onClick={deleteUser}
              >
                Sim
              </Button>
            </div>
          </Typography>
        </div>
      </Box>
    </Modal>
  )
}
