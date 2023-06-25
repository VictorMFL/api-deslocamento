import { useState } from 'react'

import { AppBar, Toolbar, IconButton, Typography, Box } from '@mui/material'

// icone
import { RiAccountCircleLine } from 'react-icons/ri'

// menu de configuração do usuário
import UserConfig from '../userConfig/UserConfig'

export default function Header() {
  const [config, setConfig] = useState(false)

  function openConfig() {
    setConfig(!config)
  }

  return (
    <div style={{ height: '60px' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            MUI
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={openConfig}
            >
              <RiAccountCircleLine />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {config && <UserConfig />}
    </div>
  )
}
