import axios from 'axios'

import { Modal, Box, Typography, Button } from '@mui/material'

type ModalDeleteProps = {
  modalDelete: boolean
  closeDelete: () => void
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

export default function ModalDelete({
  modalDelete,
  closeDelete,
}: ModalDeleteProps) {
  const idConductor = window.localStorage.getItem('Excluir-condutor')
  const idVehicle = window.localStorage.getItem('Excluir-veiculo')

  async function DeleteConductor() {
    try {
      const res = await deleteData(
        'https://api-deslocamento.herokuapp.com/api/v1/Condutor',
        Number(idConductor),
      )
      closeDelete()
      console.log(res)
    } catch (error) {
      console.error('Falha ao deletar o motorista', error)
    }
  }

  async function DeleteVehicle() {
    try {
      const res = await deleteData(
        'https://api-deslocamento.herokuapp.com/api/v1/Veiculo',
        Number(idVehicle),
      )
      closeDelete()
      console.log(res)
    } catch (error) {
      console.error('Falha ao excluir o veículo', error)
    }
  }

  return (
    <>
      <Modal
        keepMounted
        open={modalDelete}
        onClose={closeDelete}
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
              Deseja excluir qual?
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
                <Button variant="contained" onClick={DeleteConductor}>
                  Motorista
                </Button>
                <Button
                  variant="contained"
                  style={{ marginLeft: '1rem' }}
                  onClick={DeleteVehicle}
                >
                  Veículo
                </Button>
              </div>
            </Typography>
          </div>
        </Box>
      </Modal>
    </>
  )
}
