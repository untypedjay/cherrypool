import React from 'react';
import { render } from '@testing-library/react';
import Modal from './Modal';

describe('<Modal>', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Modal close={jest.fn(console.log)}>
        <h3>Test Heading</h3>
      </Modal>
    );

    expect(asFragment()).toMatchSnapshot();
  });

});