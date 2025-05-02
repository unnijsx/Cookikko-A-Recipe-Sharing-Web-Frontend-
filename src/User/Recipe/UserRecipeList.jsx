import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
  CircularProgress,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const UserRecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Dummy local data
    const fakeRecipes = [
      { id: 1, name: 'Spaghetti Carbonara', image: 'https://via.placeholder.com/100' },
      { id: 2, name: 'Chicken Biryani', image: 'https://via.placeholder.com/100' },
      { id: 3, name: 'Beef Tacos', image: 'https://via.placeholder.com/100' },
    ];

    setTimeout(() => {
      setRecipes(fakeRecipes);
      setLoading(false);
    }, 1000); // Simulate async delay
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#1e1e1e', color: '#fff',  width:"96.9vw", height:"91.8vh",p: 3,mt:2 }}>
      <Header />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 4,
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Your Recipes
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/addrecipe')}
        >
          Add New Recipe
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ backgroundColor: '#2a2a2a' }}>
        <Table >
          <TableHead >
            <TableRow >
              <TableCell sx={{ color: '#fff' }}>#</TableCell>
              <TableCell sx={{ color: '#fff' }}>Name</TableCell>
              <TableCell sx={{ color: '#fff' }}>Image</TableCell>
              <TableCell sx={{ color: '#fff' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipes.map((recipe, index) => (
              <TableRow key={recipe.id}>
                <TableCell sx={{ color: '#fff' }}>{index + 1}</TableCell>
                <TableCell sx={{ color: '#fff' }}>{recipe.name}</TableCell>
                <TableCell>
                  <Avatar
                    alt={recipe.name}
                    src={recipe.image}
                    variant="rounded"
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="info"
                    onClick={() => navigate(`/editrecipe/${recipe.id}`)}
                  >
                    View More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserRecipeList;
