import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Ingredients({ testId, ingredient,
  savedIngredients, setSavedIngredients }) {
  const [isChecked, setIsChecked] = useState(true);

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

Ingredients.propTypes = {
  testId: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  savedIngredients: PropTypes.arrayOf(PropTypes.string.isRequired),
  setSavedIngredients: PropTypes.func.isRequired,
};

Ingredients.defaultProps = {
  savedIngredients: undefined,
};

export default Ingredients;
