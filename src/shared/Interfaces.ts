import { ReactNode, ChangeEvent } from 'react';

export interface InputFieldProps {
  placeholder: string;
  name: string;
  fieldErrors: {
    [key: string]: string;
  };
  type?: string;
  textArea?: boolean;
  value?: string;
  showLabels?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ILoginValues {
  usernameOrEmail: string;
  password: string;
}

export interface ILoginErrors {
  usernameOfEmail?: string;
  password?: string;
  new_password?: string;
  password_confirmation?: string;
}

export interface ITogglePassword {
  errors: ILoginErrors;
  onSendValue: (data: string) => void;
}
