import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
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
    const { Poster, Title, Year, Type } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: `${Poster}`,
            cache: 'only-if-cached'
          }}
          style={styles.movieImg}
        />
        <View style={styles.dataContainer}>
          <Text style={styles.movieTitle}>{Title}</Text>
          <Text>{`${Year} (${Type})`}</Text>
        </View>
      </View>
    );
  }
}
