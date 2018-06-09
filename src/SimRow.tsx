import * as React from 'react';

export const SimRow = () => {
  return (
    <div>
      <span className='seed'>{Math.random()}</span>
    </div>
  );
}