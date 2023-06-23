import { Modal, Box, Typography } from '@mui/material'

type ModalPersonalDataProps = {
  modalPersonal: boolean
  closePersonaldata: () => void
}

export default function ModalPersonalData({
  modalPersonal,
  closePersonaldata,
}: ModalPersonalDataProps) {
  const name = window.localStorage.getItem('Nome')
  const uf = window.localStorage.getItem('UF')
  const city = window.localStorage.getItem('Cidade')
  const number = window.localStorage.getItem('Numero')
  const publicPlace = window.localStorage.getItem('Logradouro')
  const neighborhood = window.localStorage.getItem('Bairro')
  const documentType = window.localStorage.getItem('Tipo-documento')
  const documentNumber = window.localStorage.getItem('Num-documento')

  return (
    <Modal
      keepMounted
      open={modalPersonal}
      onClose={closePersonaldata}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box>
        <div className="modalContent">
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Dados pessoais
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            <div className="content">
              <span>Editar</span>
              <p>Nome: {name}</p>
              <p>Estado: {uf}</p>
              <p>Cidade: {city}</p>
              <p>Número: {number === '' ? 'Não informado' : number}</p>
              <p>Bairro: {neighborhood}</p>
              <p>
                Logradouro: {publicPlace === '' ? 'Não informado' : publicPlace}
              </p>
              <p>Tipo de documento: {documentType}</p>
              <p>Número do documento: {documentNumber}</p>
            </div>
          </Typography>
        </div>
      </Box>
    </Modal>
  )
}
