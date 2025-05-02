import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  MenuItem,
  Menu,
  List,
  ListItem,
  ListItemText,
  Paper,
  ClickAwayListener
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import SideMenu from '../SideMenu/SideMenu';
import './header.css';

const pages = ['Home'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '450px', // PC width
    },
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      fetch(`https://dummyjson.com/recipes/search?q=${searchQuery}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data.recipes || []);
        })
        .catch(err => {
          console.error('Error fetching search results:', err);
          setSearchResults([]);
        });
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(true);
  };

  const handleResultClick = (recipeId) => {
    navigate(`/recipedetails/${recipeId}`);
    setSearchQuery('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleClickAway = () => {
    setShowResults(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate('/viewprofile');
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate('/changepassword');
        }}
      >
        Change Password
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate('/');
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="header">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={() => setSideMenuOpen((prev) => !prev)}
            sx={{
              backgroundColor: 'transparent',
              '&:hover': { backgroundColor: 'transparent' },
              '&:focus': { outline: 'none' },  // Remove focus ring on click
            }}
          >
            {sideMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            Cookikko
          </Typography>

          <Box sx={{ flexGrow: 0.5 }} />

          <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative' }}>
              <Search className="search">
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search recipes…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowResults(true)}
                />
              </Search>

              {showResults && searchResults.length > 0 && (
                <Paper
                  sx={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    zIndex: 9999,
                    mt: 1,
                    maxHeight: 300,
                    overflow: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 3,
                  }}
                >
                  <List>
                    {searchResults.map((recipe) => (
                      <ListItem
                        key={recipe.id}
                        button
                        onClick={() => handleResultClick(recipe.id)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          },
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <img
                            src={recipe.image || 'https://via.placeholder.com/50'}
                            alt={recipe.name}
                            style={{
                              width: 50,
                              height: 50,
                              objectFit: 'cover',
                              borderRadius: 4,
                            }}
                          />
                          <ListItemText
                            primary={recipe.name}
                            secondary={`${recipe.cuisine} - ${recipe.mealType.join(', ')}`}
                          />
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>
          </ClickAwayListener>

          <Box sx={{ flexGrow: 0.5 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {pages.map((page) => (
              <MenuItem key={page} onClick={() => navigate(`/${page.toLowerCase()}`)}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                backgroundColor: 'transparent',
                '&:hover': { backgroundColor: 'transparent' },
                '&:focus': { outline: 'none' },  // Remove focus ring on click
              }}
            >
              <AccountCircle />
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{
                backgroundColor: 'transparent',
                '&:hover': { backgroundColor: 'transparent' },
                '&:focus': { outline: 'none' },  // Remove focus ring on click
              }}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Push content below AppBar */}
      <Toolbar />

      {/* Side Menu */}
      {sideMenuOpen && (
        <Box sx={{ position: 'absolute', top: 64, left: 0, width: '100%' }}>
          <SideMenu onClose={() => setSideMenuOpen(false)} />
        </Box>
      )}

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
