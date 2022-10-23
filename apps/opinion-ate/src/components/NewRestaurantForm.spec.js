import {act, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import flushPromises from 'flush-promises';
import api from '../api';
import {NewRestaurantForm} from './NewRestaurantForm';

describe('NewRestaurantForm', () => {
  const restaurantName = 'Sushi Place';
  const requiredError = 'Name is required';
  const serverError = 'The restaurant could not be saved. Please try again.';
  let createRestaurant;

  function renderComponent() {
    createRestaurant = jest.fn().mockName('createRestaurant');
    render(<NewRestaurantForm createRestaurant={createRestaurant} />);
  }
  describe('initially', () => {
    it('does not display a validation error', () => {
      renderComponent();
      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });
    it('does not display a server error', () => {
      renderComponent();
      expect(screen.queryByText(serverError)).not.toBeInTheDocument();
    });
  });
  it('allows submitting the form', async () => {
    renderComponent();
    createRestaurant.mockResolvedValue();
    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByText('Add'));
    await waitFor(() =>
      expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(''),
    );
    expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    expect(screen.queryByText(serverError)).not.toBeInTheDocument();
    expect(createRestaurant).toHaveBeenCalledWith(restaurantName);
  });

  describe('when empty', () => {
    async function submitEmptyForm() {
      renderComponent();
      userEvent.click(screen.getByText('Add'));
      return act(flushPromises);
    }
    it('displays a validation error', async () => {
      await submitEmptyForm();
      expect(screen.getByText(requiredError)).toBeInTheDocument();
    });
    it('does not call createRestaurant', async () => {
      await submitEmptyForm();
      expect(createRestaurant).not.toHaveBeenCalled();
    });
  });

  describe('when correcting a validation error', () => {
    async function fixValidationError() {
      renderComponent();
      createRestaurant.mockResolvedValue();
      userEvent.click(screen.getByText('Add'));
      await userEvent.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );
      userEvent.click(screen.getByText('Add'));
      return act(flushPromises);
    }

    it('clears the validation error', async () => {
      await fixValidationError();
      expect(screen.queryByText(requiredError)).not.toBeInTheDocument();
    });
  });

  it('displays an error when the store action rejects', async () => {
    renderComponent();
    createRestaurant.mockRejectedValue();

    await userEvent.type(
      screen.getByPlaceholderText('Add Restaurant'),
      restaurantName,
    );
    userEvent.click(screen.getByText('Add'));
    await screen.findByText(serverError);
    expect(screen.getByPlaceholderText('Add Restaurant').value).toEqual(
      restaurantName,
    );
  });

  describe('when retrying after a server error', () => {
    async function retrySubmittingForm() {
      renderComponent();
      createRestaurant.mockRejectedValue().mockResolvedValueOnce();
      await userEvent.type(
        screen.getByPlaceholderText('Add Restaurant'),
        restaurantName,
      );
      userEvent.click(screen.getByText('Add'));
      // avoid test click on button twice quickly
      await act(flushPromises);
      userEvent.click(screen.getByText('Add'));
      return act(flushPromises);
    }
    it('clears the server error', async () => {
      await retrySubmittingForm();
      expect(screen.queryByText(serverError)).not.toBeInTheDocument();
    });
  });
});
