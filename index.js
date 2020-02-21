/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux'
import store from './src/store'
import { Provider as PaperProvider } from 'react-native-paper';

import App from './App';
import ScreenJokeFilter from './src/components/screens/ScreenJokeFilter';
import ScreenJokes from './src/components/screens/ScreenJokes'


// AppRegistry.registerComponent(appName, () => App);
Navigation.registerComponentWithRedux(`WelcomeScreen`, () => App,Provider,store);
Navigation.registerComponentWithRedux(`ScreenJokeFilter`, () => ScreenJokeFilter,Provider,store);
Navigation.registerComponentWithRedux(`ScreenJokes`, () => ScreenJokes,Provider,store);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                id:'AppStack',
                children: [{
                    component: {
                        name: "ScreenJokes",
                        options: {
                            topBar: {
                                title: {
                                    text: 'Homepage'
                                }
                            }
                        }
                    }
                }]
            }
        }
    });
});

