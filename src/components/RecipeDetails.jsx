import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetails({ id, path, dataMeal,
  dataDrink, ingredientesAndMeasuresDrink, ingredientesAndMeasuresMeal }) {
  const mapDrinks = () => {
    const info = dataDrink.map((element, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ element.strDrinkThumb }
          alt={ element.strDrink }
        />
        <h1
          data-testid="recipe-title"
        >
          {element.strDrink}

        </h1>
        <h2>Categoria</h2>
        <p>
          {element.strCategory}

        </p>
        <p data-testid="recipe-category">{element.strAlcoholic}</p>
        <h2>Instruções de preparo</h2>
        <p
          data-testid="instructions"
        >
          {element.strInstructions}

        </p>
        <h2>Ingredientes</h2>
        <ul>
          {ingredientesAndMeasuresDrink.map((ingrediente, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {ingrediente}

            </li>
          ))}
        </ul>
      </div>
    ));
    return info;
  };

  const mapMeals = () => {
    const info = dataMeal.map((element, index) => (
      <div key={ index }>
        <img
          data-testid="recipe-photo"
          src={ element.strMealThumb }
          alt={ element.strMeal }
        />
        <h1
          data-testid="recipe-title"
        >
          {element.strMeal}

        </h1>
        <h2>Categoria</h2>
        <p
          data-testid="recipe-category"
        >
          {element.strCategory}

        </p>
        <h2>Instruções de preparo</h2>
        <iframe
          data-testid="video"
          title="video"
          src={ element.strYoutube }
          width="100%"
          height="360"
        />
        <p
          data-testid="instructions"
        >
          {element.strInstructions}

        </p>
        <h2>Ingredientes</h2>
        <ul>
          {ingredientesAndMeasuresMeal.map((x, i) => (
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              {x}

            </li>
          ))}
        </ul>
      </div>
    ));
    return info;
  };
  const feemdeus = () => {
    if (path.includes('meals')) {
      return mapMeals();
    } return mapDrinks();
  };
  return (
    <>
      <div>aleluia</div>
      {id}
      {feemdeus()}
    </>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  dataDrink: PropTypes.arrayOf(PropTypes.object.isRequired),
  dataMeal: PropTypes.arrayOf(PropTypes.object.isRequired),
  ingredientesAndMeasuresDrink: PropTypes.arrayOf(PropTypes.string.isRequired),
  ingredientesAndMeasuresMeal: PropTypes.arrayOf(PropTypes.string.isRequired),
};

RecipeDetails.defaultProps = {
  dataDrink: undefined,
  dataMeal: undefined,
  ingredientesAndMeasuresDrink: undefined,
  ingredientesAndMeasuresMeal: undefined,
};

export default RecipeDetails;
