/**
 * Validates a email.
 *
 * @param      {String}   email   The email
 * @return     {boolean}  { description_of_the_return_value }
 */
export const validateEmail = (email) => {
  const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRex.test(email)) {
    return true;
  }

  return false;
};

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  if (phoneRex.test(phoneNumber)) {
    return true;
  }

  return false;
};
