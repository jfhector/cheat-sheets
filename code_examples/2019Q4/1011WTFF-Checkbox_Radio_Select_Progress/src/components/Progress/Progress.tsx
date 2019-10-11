import React from 'react';
import './Progress.scss';

type Props = {
  value: number,
  max?: number,
}

export const Progress: React.FC<Props> = ({
  value,
  max = 100
}) => {

  return (
    <progress className='Progress' value={value} max={max}>{value}</progress>
  );
}
