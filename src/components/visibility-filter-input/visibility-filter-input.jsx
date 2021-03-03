import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './visibility-filter-input.scss';
import { setFilter } from '../../actions/actions';
import Form from 'react-bootstrap/Form';

function VisibilityFilterInput(props) {
	return (
		<div className="filter">
			<Form.Control onChange={(e) => props.setFilter(e.target.value)} value={props.visibilityFilter} placeholder="Search Movies" size="sm" />
		</div>
	);
}

export default connect(null, { setFilter })(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
	visibilityFilter: PropTypes.string,
};
