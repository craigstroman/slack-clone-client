import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import Themes from '../../shared/themes';

const Wrapper = styled.div`
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
  .user-status {
    &.online {
      color: ${(props) => props.theme.colors.jungleGreen};
    }
    &.away {
      color: ${(props) => props.theme.colors.sun};
    }
    &.offline {
      border: 1px solid ${(props) => props.theme.colors.black};
      border-radius: 50%;
      color: ${(props) => props.theme.colors.white};
    }
    &.small {
      font-size: 0.55em;
    }
    &.large {
      font-size: 0.85em;
    }
    margin-right: 5px;
    margin-bottom: 4px;
  }
`;

const UserStatus = (props) => {
  const { status, size } = props;

  return (
    <ThemeProvider theme={Themes}>
      <Wrapper>
        <FontAwesomeIcon icon={faCircle} className={`user-status ${status}  ${size}`} />
      </Wrapper>
    </ThemeProvider>
  );
};

UserStatus.defaultProps = {
  status: '',
  size: '',
};

UserStatus.propTypes = {
  status: PropTypes.string,
  size: PropTypes.string,
};

export default UserStatus;
