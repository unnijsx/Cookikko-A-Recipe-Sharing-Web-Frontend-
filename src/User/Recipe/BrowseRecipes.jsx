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
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const BrowseRecipes = () => {
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
        setSortedRecipes(data.recipes);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
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

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * recipesPerPage;
  const currentRecipes = sortedRecipes.slice(startIndex, startIndex + recipesPerPage);

  return (
    <div>
      <Header />
      <Box sx={{ px: 2, py: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h5" style={{ color: 'black' }}>All Recipes</Typography>
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
                justifyContent: 'center',
                padding: { xs: 2, sm: 3 }
              }}
            >
              {currentRecipes.map((recipe) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={recipe.id}
                  sx={{ display: 'flex', justifyContent: 'center' }}
                >
                  <Card
                    sx={{
                      bgcolor: '#1e1e1e',
                      color: '#fff',
                      width: '300px',
                      maxWidth: 300,
                      height: '100%',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={recipe.image}
                      alt={recipe.name}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '260px',
                          fontSize: {
                            xs: '1rem',
                            sm: '1.1rem',
                            md: '1.2rem'
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

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={Math.ceil(sortedRecipes.length / recipesPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
        )}
      </Box>
    </div>
  );
};

export default BrowseRecipes;
