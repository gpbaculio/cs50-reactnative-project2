import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Image
} from 'react-native';

export default class MovieScreen extends Component {
  static navigationOptions = ({
    navigation: {
      state: { params: params }
    }
  }) => ({
    title: params.title,
    headerStyle: {
      backgroundColor: '#f4511e'
    },
    headerTintColor: '#fff',
    headerRight: <View />
  });
  state = {
    loading: false,
    Poster: null,
    Year: null,
    Ratings: [],
    Plot: null,
    Title: null,
    error: null
  };
  componentDidMount = async () => {
    const {
      navigation: {
        state: { params: params }
      }
    } = this.props;
    const key = 'f4544712';
    await fetch(
      `http://www.omdbapi.com/?apikey=${key}&i=${params.id}&plot=full`
    )
      .then(({ _bodyInit }) => JSON.parse(_bodyInit))
      .then(({ Ratings, Rated, Runtime, Plot, Poster, Year, Title }) => {
        this.setState({
          Ratings,
          Rated,
          Runtime,
          Plot,
          Poster,
          Year,
          Title
        });
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const {
      Poster,
      Ratings,
      Rated,
      Runtime,
      Plot,
      Year,
      loading,
      Title,
      error
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          {Boolean(error) && <Text>{error}</Text>}
          {Poster === null ? (
            <Text>Loading...</Text>
          ) : (
            <React.Fragment>
              <Image
                source={{
                  uri: `${Poster}`,
                  cache: 'only-if-cached'
                }}
                style={styles.poster}
              />
              <View style={styles.heading}>
                <Text style={styles.title}>{Title}</Text>
                <Text>{` (${Year})`}</Text>
              </View>
              <View style={styles.subHeading}>
                <Text>{`${Rated}, `}</Text>
                <Text>{Runtime}</Text>
              </View>
              <Text style={styles.plot}>{Plot}</Text>
              {Ratings.map(({ Source, Value }, idx) => {
                let width;
                if (Value.includes('%')) {
                  width = Number(Value.replace('%', ''));
                } else if (Value.includes('/')) {
                  width = Number(eval(Value) * 100);
                }
                let backgroundColor;
                if (width > 70) {
                  backgroundColor = 'green';
                } else if (width > 50) {
                  backgroundColor = 'yellow';
                } else if (width < 50) {
                  backgroundColor = 'red';
                }
                return (
                  <View key={idx} style={styles.rating}>
                    <Text key={idx}>{`${Source} (${Value}):`}</Text>
                    <View
                      style={{
                        width: `${width}%`,
                        backgroundColor,
                        height: 30
                      }}
                    />
                  </View>
                );
              })}
            </React.Fragment>
          )}
        </ScrollView>
      </View>
    );
  }
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    overflow: 'visible'
  },
  poster: {
    width: '100%',
    height: width - 20, // get the width of phone then -20 padding = square of poster
    marginBottom: 10
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  subHeading: {
    flexDirection: 'row',
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  plot: {
    fontStyle: 'italic',
    marginBottom: 10
  },
  rating: {
    marginBottom: 10
  }
});
