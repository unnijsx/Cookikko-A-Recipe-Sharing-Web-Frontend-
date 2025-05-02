import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  CardMedia,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Grid,
  useMediaQuery,
  useTheme,
  Stack
} from '@mui/material';
import Header from '../Header/Header';

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching recipe:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '100vh',
        bgcolor: '#1e1e1e',
        width: '100vw',
      }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!recipe) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: '#1e1e1e',
        color: '#fff'
      }}>
        <Typography variant="h6">Recipe not found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      bgcolor: '#1e1e1e',
      color: '#fff'
    }}>
      <Header />
      
      {/* Mobile Image (top) */}
      {isSmallScreen && (
        <CardMedia
          component="img"
          image={recipe.image}
          alt={recipe.name}
          sx={{
            width: '100vw',
            height: '300px',
            objectFit: 'cover'
          }}
        />
      )}

      {/* Desktop Image (fixed left) */}
      {!isSmallScreen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '40%',
            height: '100vh',
            zIndex: 1,
          }}
        >
          <CardMedia
            component="img"
            image={recipe.image}
            alt={recipe.name}
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      )}

      {/* Content Area */}
      <Box
        sx={{
          position: 'relative',
          width: '50.85vw',
          maxWidth: '100%',
          ml: { xs: 0, md: '40%' },
          px: { xs: 2, sm: 4 },
          py: { xs: 3, sm: 4 },
          bgcolor: '#1e1e1e'
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ 
            fontWeight: 700,
            fontSize: { xs: '1.8rem', sm: '2.2rem' }
          }}>
            {recipe.name}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            <Chip
              label={`Prep: ${recipe.prepTimeMinutes} mins`}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                fontWeight: 500,
              }}
            />
            <Chip
              label={`Cook: ${recipe.cookTimeMinutes} mins`}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(255,255,255,0.1)',
                fontWeight: 500,
              }}
            />
          </Stack>

          <Divider sx={{ 
            my: 3, 
            borderColor: 'rgba(255,255,255,0.2)',
            width: '100%'
          }} />

          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}>
                Ingredients
              </Typography>
              <List dense>
                {recipe.ingredients.map((ingredient, i) => (
                  <ListItem key={i} sx={{ py: 0.5 }}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                          }}
                        >
                          <Box component="span" sx={{ mr: 1 }}>•</Box>
                          {ingredient}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ 
                mb: 2, 
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}>
                Details
              </Typography>
              <List dense>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemText 
                    primary={`Cuisine: ${recipe.cuisine}`} 
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemText 
                    primary={`Servings: ${recipe.servings}`}
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  />
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                  <ListItemText 
                    primary={`Difficulty: ${recipe.difficulty}`}
                    sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>

          <Divider sx={{ 
            my: 3, 
            borderColor: 'rgba(255,255,255,0.2)',
            width: '100%'
          }} />

          <Typography variant="h6" sx={{ 
            mb: 2, 
            fontWeight: 600,
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}>
            Instructions
          </Typography>
          <List>
            {recipe.instructions.map((step, i) => (
              <ListItem key={i} sx={{ 
                py: 1, 
                alignItems: 'flex-start',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.05)'
                }
              }}>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      <Box
                        component="span"
                        sx={{ 
                          fontWeight: 600, 
                          mr: 1, 
                          color: 'primary.main',
                          fontSize: { xs: '1rem', sm: '1.1rem' }
                        }}
                      >
                        {i + 1}.
                      </Box>
                      {step}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Box>
    </Box>
  );
};

export default RecipeDetailsPage;