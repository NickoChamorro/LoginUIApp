import * as React from 'react';
import LoginScreen from './components/login/Login.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen2 from './components/login/LoginScreen2.js';
import HomeScreen from './components/Home/Home.js';
import CreateUser from './components/createUser/CreateUser.js';

const Stack = createNativeStackNavigator();

export default function App() {

    return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen2} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CreateUser" component={CreateUser} />
        </Stack.Navigator>
    </NavigationContainer>
    );
}
