import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { fetchDrinksDetails } from '../services/fetchs/fetchItemsDetails';
import RecipeInProgress from '../components/RecipeInProgress';

function DrinkInProgress({ match: { path, params: { id } } }) {
  const [drinkInfo, setDrinkInfo] = useState({});
  const [isDisabledDrink, setIsDisabledDrink] = useState(true);
  const [drinkIngredientsAndMeasures, setDrinkIngredientsAndMeasures] = useState({
    ingredients: [],
    measures: [],
  });

  const history = useHistory();

  const { ingredients, measures } = drinkIngredientsAndMeasures;
  const ingredientsAndMeasures = ingredients
    .map((ingredient, i) => `${ingredient} - ${measures[i]}`);

  useEffect(() => {
    const getMealInfo = async () => {
      const data = await fetchDrinksDetails(id);
      setDrinkInfo(data[0]);

      if (data !== null && data !== undefined) {
        const ingredientsArray = [];
        const measuresArray = [];

        const getEntries = Object.entries(data[0]);

        const getIngredients = getEntries
          .filter((entry) => entry[0].includes('strIngredient'));
        getIngredients.forEach((entry) => ingredientsArray.push(entry[1]));
        const filteredIngredients = ingredientsArray
          .filter((ingredient) => ingredient !== null && ingredient !== '');

        const getMeasures = getEntries
          .filter((entry) => entry[0].includes('strMeasure'));
        getMeasures.forEach((entry) => measuresArray.push(entry[1]));
        const fiteredMeasures = measuresArray
          .filter((measure) => measure !== null && measure !== '' && measure !== ' ');

        setDrinkIngredientsAndMeasures((prevTest) => ({
          ...prevTest,
          ingredients: filteredIngredients,
          measures: fiteredMeasures,
        }));
      }
    };

    getMealInfo();
  }, [id]);

  const handleFinishBtn = () => {
    history.push('/done-recipes');
  };

  return (
    <section>
      <RecipeInProgress
        path={ path }
        id={ id }
        drinkInfo={ drinkInfo }
        drinkIngredientsAndMeasures={ ingredientsAndMeasures }
        setIsDisabledDrink={ setIsDisabledDrink }
      />
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ isDisabledDrink }
        onClick={ handleFinishBtn }
      >
        Finish Recipe
      </button>
    </section>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DrinkInProgress;
