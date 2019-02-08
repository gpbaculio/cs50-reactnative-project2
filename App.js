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
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

export default createAppContainer(AppNavigator);
