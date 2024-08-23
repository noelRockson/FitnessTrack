import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Menu, CardContent, IconButton, Badge, AppBar, Toolbar, CardActions, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, MenuItem, Select } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PoolIcon from '@mui/icons-material/Pool';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Goals.css';

import logo from '../Logo.png';
import { db } from './firebase';  
import { collection, query, onSnapshot, addDoc } from 'firebase/firestore';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Description } from '@mui/icons-material';

const Goals = () => {
  const auth = getAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationDialogOpen, setNotificationDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const [goalDuration, setGoalDuration] = useState(''); 
  const [durationUnit, setDurationUnit] = useState('jours');  
  const navigate = useNavigate();
  const [goalData, setGoalData] = useState({
    musculation: [],
    course: [],
    natation: [],
  });

  const goalOptions = {
    musculation: [
      { label: 'Poids (kg)', value: 'poids' },
      { label: 'Calories brûlées', value: 'calories' },
    ],
    course: [
      { label: 'Distance (km)', value: 'distance' },
      { label: 'Temps (min)', value: 'temps' },
    ],
    natation: [
      { label: 'Longueurs (m)', value: 'longueurs' },
      { label: 'Calories brûlées', value: 'calories' },
    ],
  };

  const fetchGoalData = () => {
    const goalsRef = collection(db, 'goals');
    const q = query(goalsRef);

    onSnapshot(q, (snapshot) => {
      const newGoalData = {
        musculation: [],
        course: [],
        natation: [],
      };

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.goalType) {
          newGoalData[data.goalType].push({
            date: data.date,
            type: data.type,
            value: data.value,
            duration: data.duration,
            durationUnit: data.durationUnit,  
          });
        }
      });

      setGoalData(newGoalData);
    });
  };

  useEffect(() => {
    fetchGoalData();
  }, []);

  const handleDialogOpen = (goalType) => {
    setSelectedGoal(goalType);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedOption('');
    setGoalValue('');
    setGoalDuration('');
    setDurationUnit('jours'); 
  };

  const handleGoalValueChange = (event) => {
    setGoalValue(event.target.value);
  };

  const handleGoalDurationChange = (event) => {
    setGoalDuration(event.target.value);
  };

  const handleDurationUnitChange = (event) => {  
    setDurationUnit(event.target.value);
  };

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

  const handleAddGoal = async () => {
    if (selectedGoal && selectedOption && goalValue && goalDuration) {
      const newGoal = {
        date: new Date().toLocaleDateString(),
        goalType: selectedGoal,
        type: selectedOption,
        value: goalValue,
        duration: goalDuration,
        durationUnit: durationUnit,  
      };

      try {
        await addDoc(collection(db, 'goals'), newGoal);
        toast.success(`Objectif ${selectedGoal} ajouté avec succès !`);
        fetchGoalData();
      } catch (error) {
        toast.error('Erreur lors de l\'ajout de l\'objectif. Veuillez réessayer.');
        console.error('Erreur lors de l\'ajout de l\'objectif à Firestore : ', error);
      }

      handleDialogClose();
    }
  };

  const renderChart = (goalType) => {
    const goalEntries = goalData[goalType];
    const hasData = goalEntries.length > 0;

    const data = {
      labels: hasData ? goalEntries.map(entry => entry.date) : [],
      datasets: [
        {
          data: hasData ? goalEntries.map(entry => entry.value) : [],
          label: `${goalType} Progress`,
        },
      ],
    };

    if (!hasData) {
      return <Typography variant="body2">Aucune donnée disponible pour {goalType}.</Typography>;
    }

    return (
      <BarChart
        series={data.datasets.map(dataset => ({ data: dataset.data, label: dataset.label }))}
        xAxis={[{ data: data.labels, scaleType: 'band' }]}
        height={200}
        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
      />
    );
  };

  return (
    <div className="goals-container">
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

      <div className="separator1"></div>
      <div className="charts-section">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Card className="goal-card">
              <CardContent>
                <Typography variant="h6">Musculation</Typography>
                {renderChart('musculation')}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="goal-card">
              <CardContent>
                <Typography variant="h6">Course</Typography>
                {renderChart('course')}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card className="goal-card">
              <CardContent>
                <Typography variant="h6">Natation</Typography>
                {renderChart('natation')}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>

      <div className="separator2"></div>
      <div className="goals-section">
        <Card className="goal-card">
          <CardContent>
            <Typography variant="h6">Objectifs de Fitness</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDialogOpen('musculation')}
            >
              Ajouter un Objectif
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Ajouter un Objectif</DialogTitle>
        
        <DialogContent>
          <Select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="musculation">Musculation</MenuItem>
            <MenuItem value="course">Course</MenuItem>
            <MenuItem value="natation">Natation</MenuItem>
          </Select>

          {selectedGoal && (
            <>
              <Select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                fullWidth
                margin="normal"
              >
                {goalOptions[selectedGoal].map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                label="Valeur"
                type="number"
                value={goalValue}
                onChange={handleGoalValueChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Durée"
                type="number"
                value={goalDuration}
                onChange={handleGoalDurationChange}
                fullWidth
                margin="normal"
              />
              <Select
                value={durationUnit}
                onChange={handleDurationUnitChange}  
                fullWidth
                margin="normal"
              >
                <MenuItem value="jours">Jours</MenuItem>
                <MenuItem value="mois">Mois</MenuItem>
              </Select>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Annuler</Button>
          <Button onClick={handleAddGoal}>Ajouter</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={notificationDialogOpen} onClose={handleNotificationDialogClose}>
        <DialogTitle>Notifications</DialogTitle>
        <DialogContent>
          {/* Affichage des notifications */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNotificationDialogClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Goals;
