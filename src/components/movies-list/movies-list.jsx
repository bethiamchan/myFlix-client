import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = (state) => {
	const { visibilityFilter } = state;
	return { visibilityFilter };
};

function MoviesList(props) {
	const { movies, visibilityFilter } = props;
	let filteredMovies = movies;

	if (visibilityFilter !== '') {
		filteredMovies = movies.filter((m) => m.Title.includes(visibilityFilter));
	}

	if (!movies) return <div className="main-view" />;

	return (
		<div className="movies-list">
			<VisibilityFilterInput visibilityFilter={visibilityFilter} />
			{filteredMovies.map((m) => (
				<MovieCard key={m._id} movie={m} />
			))}
		</div>
	);
}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			Title: PropTypes.string.isRequired,
		})
	),
	visibilityFilter: PropTypes.string.isRequired,
};
