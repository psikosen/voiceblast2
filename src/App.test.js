import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'

import cui from './curatedUserImages/testuser.jpg';
import App from './App';

const { getByText } = render(<App />);
                             
test('renders learn react explore', () => {
  const linkElement = getByText(/explore/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react login', () => {
  const linkElement = getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react curatedUsers', () => {
  const linkElement = getByText(/curated users/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react addCuratedUsers', () => {
  var curatedUsersList = [{
                     usrnm:"nick",
                     imgLnk:cui
                     }]; 
  render(addCuratedUsers(curatedUsersList));
  expect(screen.getByRole('a')).toHaveTextContent('nick');=
  
});
