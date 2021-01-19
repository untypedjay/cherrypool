import React, { ReactNode } from 'react';
import './Section.css';

interface Props {
  title: string
  children: ReactNode
}

function Section({ title, children }: Props) {
  return (
    <div className="section">
      { children }
    </div>
  );
}

export default Section;