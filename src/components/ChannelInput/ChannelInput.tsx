import React from 'react';
import { ITeamMessage } from '../../shared/Interfaces';
import './ChannelInput.scss';

// TODO: Don't make footer stretch all the way across the screen, only make it show up in the middle

export const ChannelInput: React.FC = () => {
  return (
    <div className="channel-input-container">
      <form>
        <input type="text" name="message" className="message-input" />
      </form>
    </div>
  );
};
