import { createStackNavigator, createAppContainer } from 'react-navigation';
import { HomeScreen, MovieScreen } from './components';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Movie: MovieScreen
  },
  {
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
        alignSelf: 'center',
        textAlign: 'center'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1
      }
    }
  }
);

export default createAppContainer(AppNavigator);
