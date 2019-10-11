import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import './RadioButton.scss';

type Props = {
    children: string,
    name: string,
    checked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    readonly?: boolean
    disabled?: boolean
    inline?: boolean
}

export const RadioButton: React.FC<Props> = ({
    children,
    name,
    checked,
    onChange,
    readonly = false, 
    disabled = false,
    inline = false,
}) => {

    return (
        <label 
            className={classNames('RadioButton', {'RadioButton--inline': inline})}>
            <input type="radio" 
            name={name}
            value={children}
            checked={checked}
            onChange={onChange}
            disabled={disabled}/>

            <span className="control-indicator" />

            {children}
        </label>
    );
}
