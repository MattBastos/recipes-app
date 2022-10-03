import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function MealIngredients({ testId, ingredient, savedIngredients,
  setSavedIngredients, setIsDisabled, mealIngredientsAndMeasures }) {
  const [isChecked, setIsChecked] = useState(true);
  const [checkedMealIngredients, setCheckedMealIngredients] = useState(0);

  useEffect(() => {
    setIsChecked(false);
    if (savedIngredients !== null && savedIngredients !== undefined) {
      const verifyIngredients = savedIngredients
        .some((element) => element === ingredient);
      if (verifyIngredients) {
        setIsChecked(true);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(savedIngredients));
  }, [savedIngredients]);

  useEffect(() => {
    if (mealIngredientsAndMeasures !== undefined
      && savedIngredients !== null) {
      const indexOf = -1;
      const filteredIngredients = mealIngredientsAndMeasures
        .filter((el) => savedIngredients.indexOf(el) !== indexOf);
      setCheckedMealIngredients(filteredIngredients.length);
    }
  }, [savedIngredients]);

  const validateFinishBtn = (checked, arrayOfIngredients) => {
    if (arrayOfIngredients !== null) {
      if (checked === arrayOfIngredients.length) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }
  };

  useEffect(() => {
    validateFinishBtn(checkedMealIngredients, mealIngredientsAndMeasures);
  }, [checkedMealIngredients]);

  const handleIngredientsInput = () => {
    setIsChecked(!isChecked);
    if (isChecked === false && savedIngredients !== null) {
      setSavedIngredients([...savedIngredients, ingredient]);
    }
    if (isChecked === true && savedIngredients !== null) {
      setSavedIngredients(savedIngredients.filter((element) => element !== ingredient));
    }
  };

  return (
    <li>
      {isChecked ? (
        <label
          data-testid={ `${testId}-ingredient-step` }
          htmlFor="ingredient"
          style={ { textDecoration: 'line-through' } }
        >
          {ingredient}
          <input
            type="checkbox"
            id="ingredient"
            checked={ isChecked }
            onChange={ handleIngredientsInput }
          />
        </label>)
        : (
          <label
            data-testid={ `${testId}-ingredient-step` }
            htmlFor="ingredient"
          >
            {ingredient}
            <input
              type="checkbox"
              id="ingredient"
              checked={ isChecked }
              onChange={ handleIngredientsInput }
            />
          </label>
        )}
    </li>
  );
}

MealIngredients.propTypes = {
  testId: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  mealIngredientsAndMeasures: PropTypes.arrayOf(PropTypes.string.isRequired),
  savedIngredients: PropTypes.arrayOf(PropTypes.string.isRequired),
  setSavedIngredients: PropTypes.func.isRequired,
  setIsDisabled: PropTypes.func,
};

MealIngredients.defaultProps = {
  savedIngredients: undefined,
  mealIngredientsAndMeasures: undefined,
  setIsDisabled: undefined,
};

export default MealIngredients;
