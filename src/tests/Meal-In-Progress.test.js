import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a página de progresso da comida', () => {
  it('Testa o botão de favoritar receita', async () => {
    localStorage.clear();

    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'email@email.com');

    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, '1234567');

    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.click(loginBtn);

    await waitFor(() => {
      const mealCard0Principal = screen.getByTestId('0-recipe-card');
      userEvent.click(mealCard0Principal);
      const startRecipeBtn = screen.getByTestId('start-recipe-btn');
      userEvent.click(startRecipeBtn);
    });

    await waitFor(() => {
      const favoriteBtn = screen.getByTestId('favorite-btn');
      const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      userEvent.click(favoriteBtn);
      expect(getFavoriteRecipes).toHaveLength(1);
    });
  });

  it('Testa o botão de compartilhar receita', async () => {
    renderWithRouter(<App />);

    await waitFor(() => {
      const shareBtn = screen.getByTestId('share-btn');
      userEvent.click(shareBtn);
      const copiedMsg = screen.getByText(/Link copied!/i);
      expect(copiedMsg).toBeInTheDocument();
    });
  });

  it('Testa se a lista de ingredientes está sendo renderizada', async () => {
    renderWithRouter(<App />);

    await waitFor(() => {
      const ingredientList = screen.getAllByTestId(/0-ingredient-step/i);
      userEvent.click(ingredientList[0]);
      expect(ingredientList).toHaveLength(2);
    });
  });

  it('Testa se o ingrediente é armazenado no localStorage quando clicado', async () => {
    localStorage.clear();

    renderWithRouter(<App />);

    await waitFor(() => {
      const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
      expect(finishRecipeBtn).toBeDisabled();

      const ingredientList = screen.getAllByTestId(/0-ingredient-step/i);
      ingredientList.forEach((ingredient) => userEvent.click(ingredient));
    });
  });
});
