import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    width: '100%'
  },
  movieImg: { width: 50, height: 50 },
  dataContainer: {
    marginLeft: 5,
    flex: 1,
    alignItems: 'flex-start'
  },
  movieTitle: {
    width: '100%',
    flexGrow: 1,
    flex: 1,
    fontWeight: 'bold'
  }
});

export default class Movie extends Component {
  render() {
    const { movie, onPress } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => onPress({ id: movie.imdbID, title: movie.Title })}>
        <Image
          source={{
            uri: `${movie.Poster}`,
            cache: 'only-if-cached'
          }}
          style={styles.movieImg}
        />
        <View style={styles.dataContainer}>
          <Text style={styles.movieTitle}>{movie.Title}</Text>
          <Text>{`${movie.Year} (${movie.Type})`}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

Movie.propTypes = {
  onPress: PropTypes.func.isRequired,
  movie: PropTypes.shape({
    Poster: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired
  }).isRequired
};
