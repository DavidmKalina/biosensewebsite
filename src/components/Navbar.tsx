import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              flexGrow: 1,
            }}
          >
            BioSense Projects
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
