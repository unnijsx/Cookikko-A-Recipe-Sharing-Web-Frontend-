import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const SideMenu = ({ onClose }) => {
  const navigate = useNavigate();  // Initialize the navigate function from react-router-dom

  // Define the menu items with corresponding routes
  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/home' },  // Redirect to Home
    { text: 'Explore Recipes', icon: <SearchIcon />, path: '/browse' },  // Redirect to Explore Recipes
    { text: 'Your Recipes', icon: <MenuBookIcon />, path: '/userrecipelist' },  // Redirect to Your Recipes
    { text: 'Logout', icon: <LogoutIcon />, path: '/' },  // Redirect to Logout
  ];

  // Handle the redirection when an item is clicked
  const handleMenuItemClick = (path) => {
    navigate(path);  // Navigate to the selected path
    onClose();  // Close the side menu after clicking
  };

  return (
    <Box
      sx={{
        width: 260,
        height: 'calc(100vh - 64px)', // assuming AppBar height is 64px
        bgcolor: '#121212',
        color: '#fff',
        position: 'fixed',
        top: '64px',
        left: 0,
        zIndex: 1200,
        p: 1,
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleMenuItemClick(item.path)}>
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mt: 2 }} />
    </Box>
  );
};

export default SideMenu;
