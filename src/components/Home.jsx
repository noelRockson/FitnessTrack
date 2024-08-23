import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Card,
  CardContent,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Grid,
} from '@mui/material';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../Logo.png';

const Home = () => {
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false); // Ne plus afficher le chargement une fois authentifie
      } else {
        setLoading(false);
        navigate('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecte
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    if (!loading && auth.currentUser) {
      const fetchNotifications = async () => {
        const fakeNotifications = [
          { id: 1, message: 'Nouvelle séance d’entraînement ajoutée' },
          { id: 2, message: 'Objectif hebdomadaire atteint !' },
          { id: 3, message: 'Objectif mensuel atteint !' },
        
        ];
        setNotifications(fakeNotifications);
      };
  
      fetchNotifications();
    }
  }, [loading, auth.currentUser]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationDialogOpen = () => {
    setNotificationDialogOpen(true);
  };

  const handleNotificationDialogClose = () => {
    setNotificationDialogOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error);
    }
  };

  return (
    <div className="home-page">
      <AppBar position="static" className="header">
        <Toolbar>
          <img src={logo} alt="FitTrack Logo" className="logo" />
          <Typography className="title" variant="h6" style={{ flexGrow: 1 }}>
            FitnessTrack
          </Typography>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleNotificationDialogOpen}>
            <Badge badgeContent={notifications.length} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="separator"></div>
      <div>
        {/* Grille des cartes */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ color: '#1976d2', marginBottom: '16px', fontSize: '250%' }} 
                >
                  Goals
                </Typography>
                <Typography variant="h5">Track your fitness goals</Typography>
                <Typography variant="body2">
                  Track your running progress and set distance, time or frequency goals, follow your strength 
                  training routine and set weight, reps or sets goals, track your swimming sessions and set distance, 
                  time or lap goals. Set weight loss goals.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/goals')} 
                >
                  Go somewhere
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  component="div"
                  style={{ color: '#1976d2', marginBottom: '16px' }} 
                >
                  Workouts
                </Typography>
                <Typography variant="h5">Track your workouts</Typography>
                <Typography variant="body2">
                  Monitor your workout routines, set goals, and track your progress to stay motivated and reach 
                  your fitness targets.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/goals')} 
                >
                  Go somewhere
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        className="menu"
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <PersonIcon style={{ marginRight: 8 }} />
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate('/settings')}>
          <SettingsIcon style={{ marginRight: 8 }} />
          Settings
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <LogoutIcon style={{ marginRight: 8 }} />
          Sign Out
        </MenuItem>
      </Menu>

      <Dialog
        open={notificationDialogOpen}
        onClose={handleNotificationDialogClose}
        aria-labelledby="notification-dialog-title"
        className="notification-dialog"
      >
        <DialogTitle id="notification-dialog-title">Notifications</DialogTitle>
        <DialogContent dividers>
          <List>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <ListItem key={notification.id}>
                  <ListItemText primary={notification.message} />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="Aucune notification" />
              </ListItem>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotificationDialogClose} color="primary">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
