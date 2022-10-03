import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MealIngredients from './MealIngredients';
import DrinkIngredients from './DrinkIngredients';
import { favoriteMealCreator, favoriteDrinkCreator } from '../services/objCreator';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress({ path, id, mealInfo, mealIngredientsAndMeasures,
  drinkInfo, drinkIngredientsAndMeasures, setIsDisabled, setIsDisabledDrink }) {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copiedMsgVisibility, setCopiedMsgVisibility] = useState(false);
  const [savedIngredients, setSavedIngredients] = useState([]);

  useEffect(() => {
    const getSavedIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getSavedIngredients !== null) {
      setSavedIngredients(getSavedIngredients);
    }
  }, []);

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (getFavoriteRecipes !== null) {
      const filteredRecipes = getFavoriteRecipes.filter((recipe) => recipe.id === id);
      setFavoriteRecipes(getFavoriteRecipes);
      if (filteredRecipes.length > 0) {
        setIsFavorite(true);
      }
    }
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleFavoriteMealBtn = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite === false) {
      setFavoriteRecipes([...favoriteRecipes, favoriteMealCreator(mealInfo)]);
    } else {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== id));
    }
  };

  const handleFavoriteDrinkBtn = () => {
    setIsFavorite(!isFavorite);
    if (isFavorite === false) {
      setFavoriteRecipes([...favoriteRecipes, favoriteDrinkCreator(drinkInfo)]);
    } else {
      setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== id));
    }
  };

  const handleShareBtn = () => {
    if (path.includes('meals')) {
      copy(`http://localhost:3000/meals/${mealInfo.idMeal}`);
      const showMsgTime = 3000;
      setCopiedMsgVisibility(true);
      setTimeout(() => setCopiedMsgVisibility(false), showMsgTime);
    } else {
      copy(`http://localhost:3000/drinks/${drinkInfo.idDrink}`);
      const showMsgTime = 3000;
      setCopiedMsgVisibility(true);
      setTimeout(() => setCopiedMsgVisibility(false), showMsgTime);
    }
  };

  const renderMeal = () => (
    <section>
      <img
        data-testid="recipe-photo"
        src={ mealInfo.strMealThumb }
        alt="Imagem da receita"
      />
      <button type="button" onClick={ handleFavoriteMealBtn }>
        {isFavorite ? (
          <img
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            alt="Favorite Button"
          />)
          : (
            <img
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              alt="Favorite Button"
            />)}
      </button>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleShareBtn }
      >
        <img src={ shareIcon } alt="Share Button" />
      </button>
      {copiedMsgVisibility && (<p>Link copied!</p>)}
      <h1 data-testid="recipe-title">
        {mealInfo.strMeal}
      </h1>
      <p data-testid="recipe-category">
        {mealInfo.strCategory}
      </p>
      <p data-testid="instructions">
        {mealInfo.strInstructions}
      </p>
      <ul>
        {mealIngredientsAndMeasures.map((mealIngredient, i) => (
          <MealIngredients
            testId={ i }
            key={ i }
            ingredient={ mealIngredient }
            savedIngredients={ savedIngredients }
            setSavedIngredients={ setSavedIngredients }
            mealIngredientsAndMeasures={ mealIngredientsAndMeasures }
            setIsDisabled={ setIsDisabled }
          />))}
      </ul>
    </section>);

  const renderDrink = () => (
    <section>
      <img
        data-testid="recipe-photo"
        src={ drinkInfo.strDrinkThumb }
        alt="Imagem da receita"
      />
      <button type="button" onClick={ handleFavoriteDrinkBtn }>
        {isFavorite ? (
          <img
            data-testid="favorite-btn"
            src={ blackHeartIcon }
            alt="Favorite Button"
          />)
          : (
            <img
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              alt="Favorite Button"
            />)}
      </button>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleShareBtn }
      >
        <img src={ shareIcon } alt="Share Button" />
      </button>
      {copiedMsgVisibility && (<div>Link copied!</div>)}
      <h1 data-testid="recipe-title">
        {drinkInfo.strDrink}
      </h1>
      <p data-testid="recipe-category">
        {drinkInfo.strCategory}
      </p>
      <p data-testid="instructions">
        {drinkInfo.strInstructions}
      </p>
      <ul>
        {drinkIngredientsAndMeasures.map((drinkIngredient, i) => (
          <DrinkIngredients
            testId={ i }
            key={ i }
            ingredient={ drinkIngredient }
            savedIngredients={ savedIngredients }
            setSavedIngredients={ setSavedIngredients }
            setIsDisabledDrink={ setIsDisabledDrink }
            drinkIngredientsAndMeasures={ drinkIngredientsAndMeasures }
          />))}
      </ul>
    </section>
  );

  const renderization = () => {
    if (path.includes('meals')) {
      return renderMeal();
    } return renderDrink();
  };

  return (
    <>
      {renderization()}
    </>
  );
}

RecipeInProgress.propTypes = {
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  mealInfo: PropTypes.shape(PropTypes.object.isRequired),
  mealIngredientsAndMeasures: PropTypes.arrayOf(PropTypes.string.isRequired),
  drinkInfo: PropTypes.shape(PropTypes.object.isRequired),
  drinkIngredientsAndMeasures: PropTypes.arrayOf(PropTypes.string.isRequired),
  setIsDisabled: PropTypes.func,
  setIsDisabledDrink: PropTypes.func,
};

RecipeInProgress.defaultProps = {
  mealInfo: undefined,
  mealIngredientsAndMeasures: undefined,
  drinkInfo: undefined,
  drinkIngredientsAndMeasures: undefined,
  setIsDisabled: undefined,
  setIsDisabledDrink: undefined,
};

export default RecipeInProgress;
