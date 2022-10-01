import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealDetails from './pages/Meal-Details';
import DrinkDetails from './pages/Drink-Details';
import MealInProgress from './pages/Meal-In-Progress';
import DrinkInProgress from './pages/Drink-In-Progress';

function App() {
  return (
    <BrowserRouter>
      <RecipesProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/meals" component={ Meals } />
          <Route exact path="/meals/:id" component={ MealDetails } />
          <Route exact path="/drinks" component={ Drinks } />
          <Route exact path="/drinks/:id" component={ DrinkDetails } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/done-recipes" component={ DoneRecipes } />
          <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route exact path="/meals/:id/in-progress" component={ MealInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
        </Switch>
      </RecipesProvider>
    </BrowserRouter>
  );
}

export default App;
