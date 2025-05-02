import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';


const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [sortedRecipes, setSortedRecipes] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const recipesPerPage = 12;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch('https://dummyjson.com/recipes');
        const data = await res.json();
        setRecipes(data.recipes);
        setSortedRecipes(data.recipes); // initially unsorted
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const sorted = [...recipes].sort((a, b) => {
      return sortOrder === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
    setSortedRecipes(sorted);
  }, [sortOrder, recipes]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    setPage(1); // reset to page 1 after sorting
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * recipesPerPage;
  const currentRecipes = sortedRecipes.slice(startIndex, startIndex + recipesPerPage);

  return (
    <div>
      <Header/>
    <Box sx={{ px: 2, py: 4 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Full-Width Carousel */}
          <Carousel
            animation="slide"
            autoPlay
            interval={4000}
            indicators
            navButtonsAlwaysVisible
            sx={{ width: '100%' }}
          >
            {recipes.slice(0, 5).map((item) => (
              <Box
                key={item.id}
                sx={{
                  height: { xs: 250, md: 400 },
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                }}
              >
                {item.name}
              </Box>
            ))}
          </Carousel>

          {/* Sorting and Recipes */}
          <Box sx={{ mt: 6 }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h4" style={{color:"black",marginLeft:"30px"}}>Browse Recipes</Typography>
              <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Sort</InputLabel>
                <Select value={sortOrder} onChange={handleSortChange} label="Sort">
                  <MenuItem value="asc">A-Z</MenuItem>
                  <MenuItem value="desc">Z-A</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Grid 
              container 
              spacing={4}
              sx={{
                justifyContent: 'center', // This centers the grid items
                padding: { xs: 2, sm: 3 } // Add some padding around the grid
              }}
            >
              {currentRecipes.map((recipe) => (
                <Grid 
                  item 
                  xs={12}  // Changed from 14 (invalid value) to 12 (full width on mobile)
                  sm={6}   // Changed from 8 to 6 (2 cards per row on small screens)
                  md={4}   // 3 cards per row on medium screens
                  lg={3}   // 4 cards per row on large screens
                  key={recipe.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center' // Centers the card within the grid item
                  }}
                >
                  <Card 
                    sx={{ 
                      bgcolor: '#1e1e1e', 
                      color: '#fff', 
                      height: '100%',
                      width: '300px',      // Changed from fixed 300px to 100% for responsiveness
                      maxWidth: 300       // Added maxWidth to prevent cards from getting too wide
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={recipe.image}
                      alt={recipe.name}
                      sx={{
                        objectFit: 'cover' // Ensures images maintain aspect ratio
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      variant="h6" 
                      gutterBottom
                      sx={{
                        whiteSpace: 'nowrap',       // Prevent text wrapping
                        overflow: 'hidden',         // Hide overflow
                        textOverflow: 'ellipsis',   // Show ellipsis when text overflows
                        width: '100%',             // Take full width of container
                        maxWidth: '260px',         // Set max width (accounting for card padding)
                        fontSize: {                // Responsive font sizes
                          xs: '1rem',              // Mobile
                          sm: '1.1rem',            // Small screens
                          md: '1.2rem'             // Medium screens and up
                        }
                      }}
                    >
                      {recipe.name}
                    </Typography>
                    <Button
                      fullWidth
                      variant="outlined"
                      color="primary"
                      component={Link}
                      to={`/recipedetails/${recipe.id}`}
                    >
                      View More
                    </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>            


            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(sortedRecipes.length / recipesPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
    </div>
  );
};

export default HomePage;
