import {
    NavigationContainer,
    useIsFocused,
    useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Switch, Text, View } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import {
    AnimationContext,
    AnimationProvider,
} from '../context/AnimationProvider';
import { useContext } from 'react';
import { Button } from '@react-navigation/elements';

type RootStackParamList = {
    Home: undefined;
    Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const NavigationContainerWrapper = () => {
    const { shouldAnimate } = useContext(AnimationContext);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ animation: shouldAnimate ? 'fade' : 'none' }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const StackNavigator = () => {
    return (
        <AnimationProvider>
            <NavigationContainerWrapper />
        </AnimationProvider>
    );
};

function HomeScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View
            role="main"
            aria-label="Home Screen"
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text
                style={{ fontSize: 32, fontWeight: '600', marginBottom: 24 }}
                role="heading"
                aria-level={2}
            >
                Home Screen
            </Text>

            <Button onPress={() => navigation.push('Details')}>
                Go to Details Screen
            </Button>
        </View>
    );
}

function DetailsScreen() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const { shouldAnimate, setShouldAnimate } = useContext(AnimationContext);

    return (
        <View
            role="main"
            aria-label="Details Screen"
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{ fontSize: 32, fontWeight: '600', marginBottom: 24 }}
                role="heading"
                aria-level={2}
            >
                Details Screen
            </Text>

            <Text style={{ fontSize: 16, marginBottom: 24 }}>
                Animation: {shouldAnimate ? 'on' : 'off'}
            </Text>
            <Switch
                value={shouldAnimate}
                onValueChange={setShouldAnimate}
                style={{ marginBottom: 24 }}
            />

            <Button onPress={() => navigation.goBack()}>
                Go back to Home Screen
            </Button>
        </View>
    );
}

export default function App() {
    return <StackNavigator />;
}
