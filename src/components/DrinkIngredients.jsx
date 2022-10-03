import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function DrinkIngredients({ testId, ingredient, savedIngredients,
  setSavedIngredients, setIsDisabledDrink, drinkIngredientsAndMeasures }) {
  const [isChecked, setIsChecked] = useState(true);
  const [checkedDrinkIngredients, setCheckedDrinkIngredients] = useState(0);

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
    if (drinkIngredientsAndMeasures !== undefined && savedIngredients !== null) {
      const indexOf = -1;
      const filteredIngredients = drinkIngredientsAndMeasures
        .filter((el) => savedIngredients.indexOf(el) !== indexOf);
      setCheckedDrinkIngredients(filteredIngredients.length);
    }
  }, [savedIngredients]);

  const validateFinishBtn = (checked, arrayOfIngredients) => {
    if (arrayOfIngredients !== undefined && arrayOfIngredients !== null) {
      if (checked === arrayOfIngredients.length) {
        setIsDisabledDrink(false);
      } else {
        setIsDisabledDrink(true);
      }
    }
  };

  useEffect(() => {
    validateFinishBtn(checkedDrinkIngredients, drinkIngredientsAndMeasures);
  }, [checkedDrinkIngredients]);

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

DrinkIngredients.propTypes = {
  testId: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  drinkIngredientsAndMeasures: PropTypes.arrayOf(PropTypes.string.isRequired),
  savedIngredients: PropTypes.arrayOf(PropTypes.string.isRequired),
  setSavedIngredients: PropTypes.func.isRequired,
  setIsDisabledDrink: PropTypes.func,
};

DrinkIngredients.defaultProps = {
  savedIngredients: undefined,
  drinkIngredientsAndMeasures: undefined,
  setIsDisabledDrink: undefined,
};

export default DrinkIngredients;
