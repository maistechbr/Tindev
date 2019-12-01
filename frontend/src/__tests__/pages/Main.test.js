import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Main from '~/pages/Main';

describe('Main page', () => {
  it('should be able to create session', () => {
    const { getByText, getByTestId, getByLabelText } = render(<Main />);

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } });
    fireEvent.submit(getByTestId('tech-form'));

    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'));
    expect(getByLabelText('Tech')).toHaveValue('');
  });
});
