import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './User/Login/login.jsx';
import Register from './User/Registration/register.jsx';
import ForgotPass from './User/Login/ForgotPass.jsx';
import Header from './User/Header/Header.jsx';
import HomePage from './User/HomePage/HomePage.jsx';
import RecipeDetailsPage from './User/Recipe/RecipeDetailsPage.jsx';
import AddRecipePage from './User/Recipe/AddRecipe.jsx';
import UserRecipeList from './User/Recipe/UserRecipeList.jsx';
import EditRecipe from './User/Recipe/EditRecipe.jsx';
import BrowseRecipes from './User/Recipe/BrowseRecipes.jsx';
import ViewProfile from './User/Profile/ViewProfile.jsx';
import ChangePassword from './User/Profile/ChangePassword.jsx';

createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgotpass' element={<ForgotPass />} />
        <Route path='/header' element={<Header/>} />
        <Route path='/home' element={<HomePage/>} />
        <Route path='/recipedetails/:id' element={<RecipeDetailsPage/>}/>
        <Route path='/addrecipe' element={<AddRecipePage/>}/>
        <Route path='/userrecipelist' element={<UserRecipeList/>}/>
        <Route path='/editrecipe/:id' element={<EditRecipe/>} />
        <Route path='/browse' element={<BrowseRecipes/>} />
        <Route path='/viewprofile' element={<ViewProfile/>} />
        <Route path='/changepassword' element={<ChangePassword/>} />
      </Routes>
    </Router>
)
