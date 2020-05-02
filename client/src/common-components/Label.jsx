import React from 'react';
import PropTypes from 'prop-types';

// const Label = (props) => {
//   const { htmlFor, ...otherProps } = props;

//   return <label htmlFor={htmlFor} {...otherProps} />;
// };

const Label = ({ htmlFor, children, required }) => (
  <label htmlFor={htmlFor}>
    {children} {required && '*'}
  </label>
);

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  required: PropTypes.bool,
};

Label.defaultProps = {
  required: false,
};

export default Label;
