import { AppRegistry } from 'react-native';
import App from '../../src/app/App';
import '../../src/assets/styles/global.css';

const rootTag = document.getElementById('root');

AppRegistry.registerComponent('Test app', () => App);
AppRegistry.runApplication('Test app', {
    rootTag,
});
