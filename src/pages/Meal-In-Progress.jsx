import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { fetchMealsDetails } from '../services/fetchs/fetchItemsDetails';
import RecipeInProgress from '../components/RecipeInProgress';

function MealInProgress({ match: { path, params: { id } } }) {
  const [mealInfo, setMealInfo] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [mealIngredientsAndMeasures, setMealIngredientsAndMeasures] = useState({
    ingredients: [],
    measures: [],
  });

  const history = useHistory();

  const { ingredients, measures } = mealIngredientsAndMeasures;
  const ingredientsAndMeasures = ingredients
    .map((ingredient, i) => `${ingredient} - ${measures[i]}`);

  useEffect(() => {
    const getMealInfo = async () => {
      const data = await fetchMealsDetails(id);
      setMealInfo(data[0]);

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

        setMealIngredientsAndMeasures((prevTest) => ({
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
        mealInfo={ mealInfo }
        mealIngredientsAndMeasures={ ingredientsAndMeasures }
        setIsDisabled={ setIsDisabled }
      />
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ handleFinishBtn }
      >
        Finish Recipe
      </button>
    </section>
  );
}

MealInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MealInProgress;
