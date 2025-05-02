import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Typography,
  CardMedia,
  Divider,
  Button,
  Grid,
  MenuItem,
  useTheme,
  IconButton,
  Stack
} from '@mui/material';
import Header from '../Header/Header';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import { useParams } from 'react-router-dom';

const difficulties = ['Easy', 'Medium', 'Hard'];

const EditRecipe = () => {
  const theme = useTheme();
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);

  const [recipe, setRecipe] = useState({
    name: '',
    prepTimeMinutes: '',
    cookTimeMinutes: '',
    cuisine: '',
    servings: '',
    difficulty: '',
    ingredients: '',
    instructions: '',
  });

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe({
          name: data.name || '',
          prepTimeMinutes: data.prepTimeMinutes || '',
          cookTimeMinutes: data.cookTimeMinutes || '',
          cuisine: data.cuisine || '',
          servings: data.servings || '',
          difficulty: data.difficulty || '',
          ingredients: data.ingredients?.join('\n') || '',
          instructions: data.instructions?.join('\n') || '',
        });
        setImagePreview(data.image);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch recipe:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpdate = () => {
    const updatedRecipe = {
      ...recipe,
      image: imagePreview,
      ingredients: recipe.ingredients.split('\n').filter(Boolean),
      instructions: recipe.instructions.split('\n').filter(Boolean),
    };
    console.log('Updated Recipe:', updatedRecipe);
    // This API is read-only — log for now
  };

  if (loading) {
    return (
      <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: '#1e1e1e', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography>Loading recipe...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '99vw', minHeight: '100vh', bgcolor: '#1e1e1e', color: '#fff' }}>
      <Header />
      <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
          Edit Recipe
        </Typography>

        <TextField
          fullWidth
          label="Recipe Name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
          InputLabelProps={{ style: { color: '#bbb' } }}
          InputProps={{ style: { color: '#fff' } }}
        />

        <Box sx={{ mb: 3 }}>
          <Button
            fullWidth
            variant="outlined"
            component="label"
            startIcon={<CloudUploadIcon />}
            sx={{
              py: 2,
              borderStyle: 'dashed',
              borderColor: '#555',
              '&:hover': {
                borderColor: '#777'
              }
            }}
          >
            Upload Recipe Image
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>

          {imagePreview && (
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
              <Box sx={{
                width: 100,
                height: 100,
                borderRadius: 1,
                overflow: 'hidden',
                border: '1px solid #555'
              }}>
                <CardMedia
                  component="img"
                  image={imagePreview}
                  alt="Preview"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <IconButton onClick={handleClearImage} color="error">
                <ClearIcon />
              </IconButton>
            </Stack>
          )}
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Prep Time (mins)"
              name="prepTimeMinutes"
              value={recipe.prepTimeMinutes}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cook Time (mins)"
              name="cookTimeMinutes"
              value={recipe.cookTimeMinutes}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cuisine"
              name="cuisine"
              value={recipe.cuisine}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Servings"
              name="servings"
              value={recipe.servings}
              onChange={handleChange}
              type="number"
              variant="outlined"
              InputLabelProps={{ style: { color: '#bbb' } }}
              InputProps={{ style: { color: '#fff' } }}
            />
          </Grid>
        </Grid>

        <TextField
          fullWidth
          select
          label="Difficulty"
          name="difficulty"
          value={recipe.difficulty}
          onChange={handleChange}
          variant="outlined"
          sx={{ mb: 3 }}
          InputLabelProps={{ style: { color: '#bbb' } }}
          InputProps={{ style: { color: '#fff' } }}
        >
          {difficulties.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Ingredients (one per line)"
          name="ingredients"
          value={recipe.ingredients}
          onChange={handleChange}
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 3 }}
          InputLabelProps={{ style: { color: '#bbb' } }}
          InputProps={{ style: { color: '#fff' } }}
        />

        <TextField
          fullWidth
          label="Instructions (one step per line)"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          multiline
          rows={6}
          variant="outlined"
          sx={{ mb: 4 }}
          InputLabelProps={{ style: { color: '#bbb' } }}
          InputProps={{ style: { color: '#fff' } }}
        />

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', mb: 4 }} />

        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleUpdate}
          sx={{
            fontWeight: 600,
            py: 1.5,
            fontSize: '1.1rem'
          }}
          disabled={!imagePreview}
        >
          Update Recipe
        </Button>
      </Box>
    </Box>
  );
};

export default EditRecipe;
