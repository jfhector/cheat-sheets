import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import './Select.scss';

type Props = {
  options: string[]
  value: string | undefined
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  id: string
  optionSelectedByDefault?: string
  inline?: boolean
}

export const Select: React.FC<Props> = ({
  options,
  value,
  onChange,
  id,
  inline = false,
}) => {

  return (
    <div className={classNames('Select', {'Select--inline': inline})}>
      <select id={id} value={value} onChange={onChange}>
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );
}