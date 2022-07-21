import { render, screen } from '@testing-library/react';
import App from './App';
import { format } from 'date-fns';

// Dashboard elements rendered tests

test('renders header title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Grow Take Home - Mackenzie Hicks/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders date selector', () => {
  render(<App />);
  const dateSelectorElement = screen.getByLabelText(/Start Date:/i);
  expect(dateSelectorElement).toBeInTheDocument();
});

test('renders country selector', () => {
  render(<App />);
  const countrySelectorElement = screen.getByLabelText(/Country/i);
  expect(countrySelectorElement).toBeInTheDocument();
});

test('renders number of results selector', () => {
  render(<App />);
  const numberOfResultsSelectorElement = screen.getByLabelText(/Number of Results/i);
  expect(numberOfResultsSelectorElement).toBeInTheDocument();
});

// Component functionality tests

it('should have yesterday selected by default on date selector', () => {
  render(<App />);

  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);
  const formattedDate = format(new Date(yesterday), 'MM/dd/yyyy');

  const dateSelectorElement = screen.getByLabelText(/Start Date:/i);
  expect(dateSelectorElement.value).toEqual(formattedDate);
});

it('should have 100 selected by default on number of results selector', () => {
  render(<App />);

  const numberOfResultsSelectorElement = screen.getByLabelText(/Number of Results/i);
  expect(numberOfResultsSelectorElement.value).toEqual('100');
});
