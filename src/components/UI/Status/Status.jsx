import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

// const onlineStyles = {
//   color: 'green',
// };

// const offlineStyles = {
//   color: '#fff',
//   borderRadius: '50%',
//   border: '1px solid #000',
// };

// export const OnlineIcon = <FontAwesomeIcon icon={faCircle} className="user-status" style={onlineStyles} />;

// export const OfflineIcon = <FontAwesomeIcon icon={faCircle} className="user-status" style={offlineStyles} />;

// export { OnlineIcon, OfflineIcon };

// const OnlineIcon = styled(faCircle)`
//   color: green;
// `;

// const OfflineIcon = styled(faCircle)`
//   color: #fff;
//   border-radius: 50%;
//   border: 1px solid #000;
// `;

const OfflineIcon = styled(faCircle)`
  color: #fff;
  border-radius: 50%;
  border: 1px solid #000;
`;

const StyledIcons = {
  OfflineIcon,
};

export default StyledIcons;
