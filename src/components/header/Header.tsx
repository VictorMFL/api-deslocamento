import { useState } from 'react'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
} from '@mui/material'

// icones
import { MdNotifications } from 'react-icons/md'
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
              aria-label="show 4 new mails"
              color="inherit"
            ></IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={0} color="error">
                <MdNotifications />
              </Badge>
            </IconButton>
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
