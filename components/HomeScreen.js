import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native';

import Movie from './Movie';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff'
  };
  state = {
    text: '',
    loading: false,
    error: '',
    movies: [],
    timeOut: 0,
    page: 1
  };
  componentDidUpdate(_prevProps, prevState) {
    if (this.state.timeOut !== prevState.timeOut) {
      clearTimeout(prevState.timeOut);
    }
  }
  fetchMovies = () => {
    const { text, page } = this.state;
    const timeOut = setTimeout(async () => {
      const key = 'f4544712';
      if (text) {
        this.setState({ loading: true, timeOut });
        await fetch(
          `http://www.omdbapi.com/?apikey=${key}&s=${text}&page=${page}`
        )
          .then(({ _bodyInit }) => JSON.parse(_bodyInit))
          .then(({ Search: movies }) => {
            this.setState({ movies, loading: false });
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      }
    }, 1500);
  };
  handleInputChange = (key, val) => {
    this.setState({ [key]: val }, this.fetchMovies);
  };
  renderSeparator = () => <View style={styles.separator} />;
  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.footer}>
        <Text>Loading...</Text>
      </View>
    );
  };
  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      const { text, page } = this.state;
      const key = 'f4544712';
      this.setState({ loading: true });
      await fetch(
        `http://www.omdbapi.com/?apikey=${key}&s=${text}&page=${page}`
      )
        .then(({ _bodyInit }) => JSON.parse(_bodyInit))
        .then(({ Search: movies }) => {
          this.setState({
            movies: [...this.state.movies, ...movies],
            loading: false
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        });
    });
  };
  onPress = ({ id, title }) => {
    this.props.navigation.navigate('Movie', { id, title });
  };
  render() {
    const { text, movies } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.listContainer}
          data={movies}
          renderItem={({ item }) => (
            <Movie onPress={this.onPress} movie={item} />
          )}
          keyExtractor={({ imdbID }) => imdbID}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={
            <TextInput
              style={styles.search}
              onChangeText={text => this.handleInputChange('text', text)}
              value={text}
            />
          }
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.1}
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
    borderWidth: 1
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
  }
});
