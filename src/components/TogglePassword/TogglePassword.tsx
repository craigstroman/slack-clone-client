import React, { useState } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ITogglePassword } from '../../shared/Interfaces';
import './TogglePassword.scss';

export const TogglePassword: React.FC<ITogglePassword> = ({ errors, onSendValue }) => {
  const [inputType, setInputType] = useState<string>('password');
  const [icon, setIcon] = useState<IconDefinition>(faEyeSlash);
  const [iconLabel, setIconLabel] = useState<string>('Hide password');

  const togglePasswordView = () => {
    if (inputType === 'password') {
      setIcon(faEye);
      setIconLabel('Show password');
      onSendValue('text');
      setInputType('text');
    } else {
      setIcon(faEyeSlash);
      setIconLabel('Hide password');
      onSendValue('password');
      setInputType('password');
    }
  };
  return (
    <div
      className={
        errors?.password || errors?.new_password || errors?.password_confirmation
          ? 'toggle-password error'
          : 'toggle-password'
      }
    >
      <FontAwesomeIcon icon={icon} className="icon" onClick={togglePasswordView} aria-label={iconLabel} />
    </div>
  );
};
