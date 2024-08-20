import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Card,
  CardContent,
  TextField,
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
  Select,
  InputLabel,
  FormControl
  
} from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../Logo.png';

const Home = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const [goals, setGoals] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      const fakeNotifications = [
        { id: 1, message: 'Nouvelle séance d’entraînement ajoutée' },
        { id: 2, message: 'Objectif hebdomadaire atteint !' },
        // Ajoutez plus de notifications ici...
      ];
      setNotifications(fakeNotifications);
    };

    fetchNotifications();
  }, []);

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

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleGoalChange = (event) => {
    setSelectedGoal(event.target.value);
  };

  const handleGoalValueChange = (event) => {
    setGoalValue(event.target.value);
  };

  const handleAddGoal = () => {
    if (selectedGoal && goalValue) {
      setGoals([...goals, { type: selectedGoal, value: goalValue }]);
      setGoalValue('');
      setDialogOpen(false);
    }
  };

  return (
    <div className="home-page">
      <AppBar position="static" className="header">
        <Toolbar>
          <img src={logo} alt="FitTrack Logo" className="logo" />
          <Typography className='title' variant="h6" style={{ flexGrow: 1 }}>
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

      <div className="content">
        <Typography variant="h5">Définition et suivi des objectifs de fitness</Typography>
        <Card>
          <CardContent>
            <Button variant="contained" onClick={handleDialogOpen}>
              Ajouter un objectif
            </Button>
            <div>
              <Typography variant="h6">Objectifs :</Typography>
              {goals.map((goal, index) => (
                <div key={index}>
                  <Typography variant="body1">{`${goal.type} - ${goal.value}`}</Typography>
                </div>
              ))}
            </div>
            <div>
              <Typography variant="h6">Récompenses et Badges :</Typography>
              {/* Ajoutez la logique pour les récompenses et badges ici */}
            </div>
          </CardContent>
        </Card>
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

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Ajouter un objectif</DialogTitle>
        <DialogContent className='custom-dialog-content'>
          <FormControl fullWidth>
            <InputLabel>Objectif</InputLabel>
            <Select
              value={selectedGoal}
              onChange={handleGoalChange}
              label="Objectif"
              color ="primary"
            >
              <MenuItem value="course">Course</MenuItem>
              <MenuItem value="natation">Natation</MenuItem>
              <MenuItem value="perte-poids">Perte de poids</MenuItem>
              {/* Ajoutez d'autres objectifs ici */}
            </Select>
          </FormControl>
          {selectedGoal && (
            <TextField
              margin="dense"
              label={selectedGoal === 'perte-poids' ? 'Poids à perdre (kg)' : 'Distance / Durée'}
              type="number"
              fullWidth
              variant="standard"
              value={goalValue}
              onChange={handleGoalValueChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Annuler</Button>
          <Button onClick={handleAddGoal}>Ajouter</Button>
        </DialogActions>
      </Dialog>

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
