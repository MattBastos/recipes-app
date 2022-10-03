import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

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
// const SEARCH_TOP_BTN = 'search-top-btn';
// const SEARCH_INPUT = 'search-input';
// const NAME_SEARCH_RADIO = 'name-search-radio';
// const EXEC_SEARCH_BTN = 'exec-search-btn';

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

    const FL_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=G';
    fetch(FL_DRINK_URL);
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

    const IN_DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    fetch(IN_DRINKS_URL);
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

    const NAME_DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=GG';

    fetch(NAME_DRINK_URL);
    waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  it('Testa se o retorno for apenas uma receita, ela é renderizada na tela drinks', async () => {
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

    const ONE_RECIPE_URL = 'https:www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine';
    fetch(ONE_RECIPE_URL);

    expect(fetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(history.location.pathname).toEqual('/drinks/178319');
    });
  });

  it('Testa se apenas 12 cards são renderizado na pagina drinks', async () => {
    renderWithRouter(<App />, '/drinks');

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

    const btnSearch = screen.getByTestId(searchTopButtonStrg);
    // expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    // await waitFor(
    //   () => expect(screen.getByText(/search/i)),
    // );

    const inputSearch = screen.getByTestId(searchInputStrg);
    userEvent.type(inputSearch, 'xxxx');

    const BtnRadioName = screen.getByTestId(nameSearchButtonStrg);
    userEvent.type(BtnRadioName, { target: { value: true } });
    expect(BtnRadioName.value).toBe(/name/i);

    const btnSearchRecipes = screen.getByTestId(execSearchBtnStrg);
    expect(btnSearchRecipes).toBeInTheDocument();
    userEvent.click(btnSearchRecipes);

    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    await waitFor(
      () => expect(alertMock).toHaveBeenCalledTimes(1),
    );
  });
});
