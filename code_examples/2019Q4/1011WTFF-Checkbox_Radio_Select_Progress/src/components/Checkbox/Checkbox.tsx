import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import './Checkbox.scss';

type Props = {
    children: string,
    checked: boolean,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    readonly?: boolean
    disabled?: boolean
    inline?: boolean
}

export const Checkbox: React.FC<Props> = ({
    children,
    checked,
    onChange,
    readonly = false, 
    disabled = false,
    inline = false,
}) => {
    return (
        <label className={classNames('Checkbox', {'Checkbox--inline': inline})}>
            <input type="checkbox" 
            checked={checked}
            onChange={onChange}
            disabled={disabled}/>

            <span className="control-indicator" />

            {children}
        </label>
    );
}
