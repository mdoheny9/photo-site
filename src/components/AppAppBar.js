import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import {Box, AppBar, Toolbar, Button, IconButton, Container, Divider, MenuItem, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import { Typography } from '@mui/material';

import { useAuth } from './AuthProvider';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const { token, logout } = useAuth();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  function TopComponent() {
    if (token) {
      return (
        <Container>
          <Button onClick={logout} color="secondary" variant="contained" size="small">
            Sign out
          </Button>
          <Button href="/profile" color="primary" variant="contained" size="small">
            My Profile
          </Button>
        </Container>
      );
    } else { // guest login
      return (
        <Container>
          <Button href = "/sign-in" color="primary" variant="contained" size="small">
            Sign in
          </Button>
          <Typography variant="caption text" color="textSecondary"> or </Typography>
          <Button href = "/sign-up" color="primary" variant="outlined" size="small">
            Sign up
          </Button>
        </Container>
      );
    }
  }

  function DropDownComponent() {
    if (token) {
      return (
        <Container>
          <Button onClick={logout} color="secondary" variant="contained" size="small">
            Sign out
          </Button>
          <Button href="/profile" color="primary" variant="contained" size="small">
            My Profile
          </Button>
        </Container>
      );
    } else {
      return (
        <Container>
          <MenuItem>
            <Button href="/sign-in" color="primary" variant="contained" fullWidth>
              Sign in
            </Button>
          </MenuItem>
          <Typography align="center" color="textSecondary">or</Typography>
          <MenuItem>
            <Button href = "/sign-up" color="primary" variant="outlined" fullWidth>
              Sign up
            </Button>
          </MenuItem>
        </Container>
      );
    }
  }

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button href="/upload" color="primary" variant="outlined" size="small" >
                Upload photo
              </Button>
              <Button href = "/" variant="text" color="info" size="small">
                Gallery
              </Button>
              <Button variant="text" color="info" size="small">
                Map view
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <TopComponent />
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>
                  <Button href="/upload" variant = "outlined">
                    Upload photo
                  </Button>
                </MenuItem>
                <MenuItem>Gallery</MenuItem>
                <MenuItem>Map View</MenuItem>
                <Divider sx={{ my: 3 }} />
                <DropDownComponent />
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
