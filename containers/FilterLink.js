// import { connect } from 'react-redux'
// import { setVisibilityFilter } from '../actions'
// import Link from '../components/Link'
// import { Link } from 'react-router';
//
// const mapStateToProps = (state, ownProps) => ({
//   active: ownProps.filter === state.visibilityFilter
// })
//
// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onClick(){
//     dispatch(setVisibilityFilter(ownProps.filter))
//   }
// })
//
// const FilterLink = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Link)
//
// export default FilterLink
//
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const FilterLink = ({ filter, children }) => (
  <Link
    to={filter === 'all' ? '' : filter}
    activeStyle={{
      textDecoration: 'none',
      color: 'black',
    }}
  >
    {children}

  </Link>
);

FilterLink.propTypes = {
  filter: PropTypes.oneOf(['all', 'completed', 'active']).isRequired,
  children: PropTypes.node.isRequired,
};

export default FilterLink;
