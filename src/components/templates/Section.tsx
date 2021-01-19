import React, { ReactNode } from 'react';
import './Section.css';

interface Props {
  title: string
  children: ReactNode
}

function Section({ title, children }: Props) {
  return (
    <div className="section">
      <h3 className="section__title">{ title }</h3>
      { children }
    </div>
  );
}

export default Section;