import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import mealIngredients from '../../cypress/mocks/mealIngredients';

const searchInputStrg = 'search-input';
const ingredientSearchRadioStrg = 'ingredient-search-radio';
const nameSearchButtonStrg = 'name-search-radio';
const firstLetterRadioStrg = 'first-letter-search-radio';
const execSearchBtnStrg = 'exec-search-btn';
const searchTopButtonStrg = 'search-top-btn';
const emailInputStrg = 'email-input';
const passwordInputStrg = 'password-input';
const loginSubmitBtnStrg = 'login-submit-btn';
const emailInputed = 'email@email.com';

describe('Testa o componente Search Bar', () => {
  it('Testa se o componente é renderizado na paǵina', () => {
    renderWithRouter(<App />);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    expect(searchTopButton).toBeInTheDocument();
  });

  it('Testa o Search Bar', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputStrg);
    userEvent.type(emailInput, emailInputed);

    const passwordInput = screen.getByTestId(passwordInputStrg);
    userEvent.type(passwordInput, '1234567');

    const loginBtn = screen.getByTestId(loginSubmitBtnStrg);
    userEvent.click(loginBtn);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    expect(searchTopButton).toBeInTheDocument();
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    waitFor(() => expect(inputValueFilter).toBeInTheDocument());

    const ingredienteSearchRadio = screen.getByTestId(ingredientSearchRadioStrg);
    waitFor(() => expect(ingredienteSearchRadio).toBeInTheDocument());

    const nameSearchButton = screen.getByTestId(nameSearchButtonStrg);
    waitFor(() => expect(nameSearchButton).toBeInTheDocument());

    const firstLetterRadio = screen.getByTestId(firstLetterRadioStrg);
    waitFor(() => expect(firstLetterRadio).toBeInTheDocument());
  });

  it('Testa se o Alert do FirstLetter é disparado na pagina meals', () => {
    global.alert = jest.fn();
    renderWithRouter(<App />);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'aa');

    const firstLetterRadio = screen.getByTestId(firstLetterRadioStrg);
    userEvent.click(firstLetterRadio);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(inputValueFilter).toHaveProperty('value', 'aa');
  });

  it('Testa se o filtro First letter funciona corretamente na tela meals', () => {
    renderWithRouter(<App />);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'C');

    const firstLetterRadio = screen.getByTestId(firstLetterRadioStrg);
    userEvent.click(firstLetterRadio);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);
    const fetch = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=C') { return Promise.resolve(meals); }
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se o filtro Ingrendiente funciona corretamente na tela meals', async () => {
    renderWithRouter(<App />);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'chiken');

    const ingredienteSearchRadio = screen.getByTestId(ingredientSearchRadioStrg);
    userEvent.click(ingredienteSearchRadio);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);
    const fetch = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list') { return Promise.resolve(mealIngredients); }
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se o filtro Nome funciona corretamente na tela meals', () => {
    renderWithRouter(<App />);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'Corba');

    const nameSearchButton = screen.getByTestId(nameSearchButtonStrg);
    userEvent.click(nameSearchButton);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);
    const fetch = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Corba') { return Promise.resolve(meals); }
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se o retorno for apenas uma receita, ela é renderizada na tela meals', () => {
    renderWithRouter(<App />);
    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'Arrabiata');

    const nameSearchButton = screen.getByTestId(nameSearchButtonStrg);
    userEvent.click(nameSearchButton);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);
    const fetch = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (
          url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
          || url === 'https://www.themealdb.com/api/json/v1/1/random.php'
          || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'
          || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977'
        ) { return Promise.resolve(oneMeal); }
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa se apenas 12 cards são renderizado na pagina meals', async () => {
    renderWithRouter(<App />);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'Chicken');

    const ingredienteSearchRadio = screen.getByTestId(ingredientSearchRadioStrg);
    userEvent.click(ingredienteSearchRadio);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);

    const cardsImages = await screen.findAllByTestId(/-recipe-card/);
    expect(cardsImages).toHaveLength(12);
  });
});
