import React, { ReactNode } from 'react';
import Button from './Button';

interface Props {
  onClick: () => any;
  children: ReactNode;
};

function PrimaryButton({ onClick, children }: Props) {
  return (
    <Button classSelector="button--primary" onClick={onClick}>
      { children }
    </Button>
  );
};

export default PrimaryButton;