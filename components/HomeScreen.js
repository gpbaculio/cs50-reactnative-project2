import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native';

import Movie from './Movie';

const apiKey = 'f4544712';

class HomeScreen extends Component {

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff'
  };

  state = {
    text: '',
    refetching: false,
    loading: false,
    error: '',
    movies: [],
    timeOut: 0,
    page: 1
  };

  timeout = 0;

  fetchMovies = () => {
    const { text, page } = this.state;
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
    if (text) {
      this.timeOut = setTimeout(async () => {
        this.setState({ loading: true });
        await fetch(
          `http://www.omdbapi.com/?apikey=${apiKey}&s=${text}&page=${page}`
        )
          .then(({ _bodyInit }) => JSON.parse(_bodyInit))
          .then(({ Search: movies }) => {
            console.log(`fetch!`)
            this.setState({ movies, loading: false });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      }, 2000);
    }
  };

  handleInputChange = (key, val) => {
    this.setState({ [key]: val }, this.fetchMovies);
  };

  renderSeparator = () => <View style={styles.separator} />;

  renderFooter = () => {
    if (!this.state.refetching) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1, refetching: true }, async () => {
      const { text, page } = this.state;
      await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${text}&page=${page}`
      )
        .then(({ _bodyInit }) => JSON.parse(_bodyInit))
        .then(({ Search: movies }) => {
          this.setState({
            movies: [...this.state.movies, ...movies],
            refetching: false
          });
        })
        .catch(error => {
          this.setState({ error, refetching: false });
        });
    });
  };

  onPress = ({ id, title }) => {
    this.props.navigation.navigate('Movie', { id, title });
  };

  render() {
    const { text, movies, loading } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={movies}
          renderItem={({ item }) => <Movie onPress={this.onPress} movie={item} />}
          keyExtractor={({ imdbID }) => imdbID}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={
            <React.Fragment>
              <TextInput
                style={styles.search}
                onChangeText={text => this.handleInputChange('text', text)}
                value={text}
                placeholder='Search...'
              />
              {!!loading &&
                <View style={styles.footer}>
                  <ActivityIndicator animating size="large" />
                </View>}
            </React.Fragment>
          }
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.01}
          onEndReached={this.handleLoadMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    width: Dimensions.get('window').width
  },
  search: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5
  },
  listContainer: {
    width: '100%',
    flex: 1,
    height: 300
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#CED0CE'
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE'
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .2)'
  }
});

export default HomeScreen