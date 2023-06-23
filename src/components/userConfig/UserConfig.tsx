import { useState } from 'react'

// icones
import { RiAccountCircleLine } from 'react-icons/ri'
import { MdArrowForwardIos } from 'react-icons/md'
import { VscKey } from 'react-icons/vsc'
import { FiLogOut } from 'react-icons/fi'

//  modais
import ModalPersonalData from '../modals/ModalPersonalData'
import ModalInfo from '../modals/ModalInfo'
import ModalLogout from '../modals/ModalLogout'

import styles from './UserConfig.module.css'

export default function UserConfig() {
  const [modalPersonal, setModalPersonal] = useState(false)
  const openPersonaldata = () => setModalPersonal(true)
  const closePersonaldata = () => setModalPersonal(false)

  const [modalInfo, setModalInfo] = useState(false)
  const openModalInfo = () => setModalInfo(true)
  const closeModalInfo = () => setModalInfo(false)

  const [modalLogout, setModalLogout] = useState(false)
  const openModalLogout = () => setModalLogout(true)
  const closeModalLogout = () => setModalLogout(false)

  const name = window.localStorage.getItem('Nome')
  const city = window.localStorage.getItem('Cidade')

  return (
    <section className={styles.container}>
      <div className={styles.user}>
        <RiAccountCircleLine size={32} />
        <div>
          <h1>{name}</h1>
          <p>{city}</p>
        </div>
      </div>

      <div className={styles.data}>
        <p className={styles.title}>Conta</p>
        <div className={styles.info}>
          <RiAccountCircleLine size={24} style={{ marginRight: '10px' }} />
          <p onClick={openPersonaldata}>Dados pessoais</p>
          <div style={{ position: 'relative' }}>
            <MdArrowForwardIos
              size={24}
              style={{ position: 'absolute', right: '0', cursor: 'pointer' }}
              onClick={openPersonaldata}
            />
          </div>
        </div>
        <div className={styles.info}>
          <VscKey size={24} style={{ marginRight: '10px' }} />
          <p onClick={openModalInfo}>Informações de login</p>
          <div style={{ position: 'relative' }}>
            <MdArrowForwardIos
              size={24}
              style={{ position: 'absolute', right: '0', cursor: 'pointer' }}
              onClick={openModalInfo}
            />
          </div>
        </div>
      </div>
      <div className={styles.data}>
        <div className={styles.info}>
          <FiLogOut
            color="#A22"
            size={24}
            style={{ marginRight: '10px', cursor: 'pointer' }}
            onClick={openModalLogout}
          />
          <p
            style={{ color: '#A22', cursor: 'pointer' }}
            onClick={openModalLogout}
          >
            Sair
          </p>
        </div>
      </div>
      {modalPersonal && (
        <ModalPersonalData
          modalPersonal={modalPersonal}
          closePersonaldata={closePersonaldata}
        />
      )}

      {modalInfo && (
        <ModalInfo modalInfo={modalInfo} closeModalInfo={closeModalInfo} />
      )}

      {modalLogout && (
        <ModalLogout
          modalLogout={modalLogout}
          closeModalLogout={closeModalLogout}
        />
      )}
    </section>
  )
}
