import { FC } from 'react';
import './style.css';

export const DotsLoading: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  return isLoading ? (
    <div data-title='dot-falling'>
      <div className='stage'>
        <div className='dot-falling'></div>
      </div>
    </div>
  ) : (
    <div></div>
  );
};
