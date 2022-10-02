import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
// import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
// import oneMeal from '../../cypress/mocks/oneMeal';
// import mealIngredients from '../../cypress/mocks/mealIngredients';
// import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';
import oneDrink from '../../cypress/mocks/oneDrink';
// import fetch from '../../cypress/mocks/fetch';
// import Drinks from '../pages/Drinks';

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
const drinkIconStrg = 'drinks-bottom-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const NAME_SEARCH_RADIO = 'name-search-radio';
const EXEC_SEARCH_BTN = 'exec-search-btn';

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

  it('Testa se o Alert do FirstLetter é disparado na pagina drink', () => {
    global.alert = jest.fn();
    renderWithRouter(<App />);

    const drinkIcon = screen.getByTestId(drinkIconStrg);
    userEvent.click(drinkIcon);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'aa');

    const firstLetterRadio = screen.getByTestId(firstLetterRadioStrg);
    userEvent.click(firstLetterRadio);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);

    waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
    expect(inputValueFilter).toHaveProperty('value', 'aa');
  });

  it('Testa se o filtro First letter funciona corretamente na tela drinks', () => {
    renderWithRouter(<App />);

    const drinkIcon = screen.getByTestId(drinkIconStrg);
    userEvent.click(drinkIcon);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'G');

    const firstLetterRadio = screen.getByTestId(firstLetterRadioStrg);
    userEvent.click(firstLetterRadio);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);
    const fetch = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=G') { return Promise.resolve(drinks); }
      },
    });
    waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it('Testa se o filtro Ingrendiente funciona corretamente na tela drinks', () => {
    renderWithRouter(<App />);

    const drinkIcon = screen.getByTestId(drinkIconStrg);
    userEvent.click(drinkIcon);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'water');

    const ingredienteSearchRadio = screen.getByTestId(ingredientSearchRadioStrg);
    userEvent.click(ingredienteSearchRadio);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);
    const fetch = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=water') { return Promise.resolve(drinksByIngredient); }
      },
    });
    waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it('Testa se o filtro Nome funciona corretamente na tela drinks', () => {
    renderWithRouter(<App />);

    const drinkIcon = screen.getByTestId(drinkIconStrg);
    userEvent.click(drinkIcon);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'GG');

    const nameSearchButton = screen.getByTestId(nameSearchButtonStrg);
    userEvent.click(nameSearchButton);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);
    const fetch = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=GG') { return Promise.resolve(drinks); }
      },
    });
    waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it('Testa se apenas 12 cards são renderizado na pagina drinks', async () => {
    renderWithRouter(<App />);

    const drinkIcon = screen.getByTestId(drinkIconStrg);
    userEvent.click(drinkIcon);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'water');

    const ingredienteSearchRadio = screen.getByTestId(ingredientSearchRadioStrg);
    userEvent.click(ingredienteSearchRadio);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);

    const cardsImages = await screen.findAllByTestId(/-recipe-card/);
    waitFor(() => expect(cardsImages).toHaveLength(12));
  });

  it('Verifica se e exibida a mensagem de alerta caso não encontre nenhuma receita na tela de drinks', async () => {
    renderWithRouter(<App />, '/drinks');

    const btnSearch = screen.getByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    await waitFor(
      () => expect(screen.getByText(/search/i)),
    );

    const inputSearch = screen.getByTestId(SEARCH_INPUT);
    userEvent.type(inputSearch, 'xxxx');

    const BtnRadioName = screen.getByTestId(NAME_SEARCH_RADIO);
    userEvent.type(BtnRadioName, { target: { value: true } });
    expect(BtnRadioName.value).toBe('name');

    const btnSearchRecipes = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(btnSearchRecipes).toBeInTheDocument();
    userEvent.click(btnSearchRecipes);

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    await waitFor(
      () => expect(alertMock).toHaveBeenCalledTimes(1),
    );
  });

  // it('Testa se o retorno for apenas uma receita, ela é renderizada na tela drinks', () => {
  //   renderWithRouter(<App />);
  //   const emailInput = screen.getByTestId(emailInputStrg);
  //   userEvent.type(emailInput, emailInputed);

  //   const passwordInput = screen.getByTestId(passwordInputStrg);
  //   userEvent.type(passwordInput, '1234567');

  //   const loginBtn = screen.getByTestId(loginSubmitBtnStrg);
  //   userEvent.click(loginBtn);

  //   const drinkIcon = screen.getByTestId(drinkIconStrg);
  //   userEvent.click(drinkIcon);

  //   const searchTopButton = screen.getByTestId(searchTopButtonStrg);
  //   userEvent.click(searchTopButton);

  //   const inputValueFilter = screen.getByTestId(searchInputStrg);
  //   userEvent.type(inputValueFilter, 'Aquamrine');

  //   const nameSearchButton = screen.getByTestId(nameSearchButtonStrg);
  //   userEvent.click(nameSearchButton);

  //   const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
  //   userEvent.click(execSearchBtn);
  //   const fetch = (url) => Promise.resolve({
  //     status: 200,
  //     ok: true,
  //     json: () => {
  //       if (
  //         url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
  //         || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  //         || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
  //       ) { return Promise.resolve(oneDrink); }
  //     },
  //   });
  //   expect(fetch).toHaveBeenCalledTimes(1);
  // });

  // it('Testa se o retorno for apenas uma receita, ela é renderizada na tela drinks', async () => {
  //   const fetch = (url) => Promise.resolve({
  //     status: 200,
  //     ok: true,
  //     json: () => {
  //       if (
  //         url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
  //       || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
  //       || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
  //       ) { return Promise.resolve(oneDrink); }
  //     },
  //   });
  //   const { history } = renderWithRouter(<App />, '/drinks/178319');
  //   // renderWithRouter(<App />, '/drinks');

  //   const emailInput = screen.getByTestId(emailInputStrg);
  //   userEvent.type(emailInput, emailInputed);

  //   const passwordInput = screen.getByTestId(passwordInputStrg);
  //   userEvent.type(passwordInput, '1234567');

  //   const loginBtn = screen.getByTestId(loginSubmitBtnStrg);
  //   userEvent.click(loginBtn);

  //   const drinkIcon = screen.getByTestId(drinkIconStrg);
  //   userEvent.click(drinkIcon);

  //   expect(screen.getByRole('heading', { name: /drinks/i })).toBeInTheDocument();
  //   const searchTopButton = screen.getByTestId(searchTopButtonStrg);
  //   userEvent.click(searchTopButton);

  //   const inputValueFilter = screen.getByTestId(searchInputStrg);
  //   userEvent.type(inputValueFilter, 'Aquamarine');

  //   const nameSearchButton = screen.getByTestId(nameSearchButtonStrg);
  //   userEvent.click(nameSearchButton);

  //   const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
  //   userEvent.click(execSearchBtn);

  //   await waitFor(() => {
  //     // expect(history.location.pathname).toEqual('/drinks/178319');
  //     // const bebidaX = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine';
  //     // const fetchQualquer = await fetchDrink1(bebidaX);

  //     // expect(fetch).toHaveBeenCalled();
  //     // fetch(bebidaX);
  //     // expect(fetchQualquer).toHaveBeenCalledTimes(1);
  //     expect(history.location.pathname).toEqual('/drinks/178319');
  //   });
  // });

  it('Testa se o retorno for apenas uma receita, ela é renderizada na tela drinks', () => {
    renderWithRouter(<App />);
    const { history } = renderWithRouter(<App />, '/drinks/178319');

    const drinkIcon = screen.getByTestId(drinkIconStrg);
    userEvent.click(drinkIcon);

    const searchTopButton = screen.getByTestId(searchTopButtonStrg);
    userEvent.click(searchTopButton);

    const inputValueFilter = screen.getByTestId(searchInputStrg);
    userEvent.type(inputValueFilter, 'Aquamarine');

    const nameSearchButton = screen.getByTestId(nameSearchButtonStrg);
    userEvent.click(nameSearchButton);

    const execSearchBtn = screen.getByTestId(execSearchBtnStrg);
    userEvent.click(execSearchBtn);

    waitFor(() => {
      // const { path: { path } } = history;
      // expect(path).toEqual('/drinks/178319');
    });
    const fetch = (url) => Promise.resolve({
      status: 200,
      ok: true,
      json: () => {
        if (
          url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
          || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
          || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
        ) { return Promise.resolve(oneDrink); }
      },
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(history.location.pathname).toEqual('/drinks/178319');
  });
});
