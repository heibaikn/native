import {
    StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
    Main: { screen: MainScreen },
    Profile: { screen: ProfileScreen },
});