import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginForm from './screens/LoginForm';
import RestaurantList from './screens/RestaurantList';
import Details from './screens/Details';

const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator initialRouteName='Details'>
            <Stack.Screen name="LoginForm" component={LoginForm} />
            <Stack.Screen name="RestaurantList" component={RestaurantList} />
            <Stack.Screen name='Details' component={Details} />
        </Stack.Navigator>
    );
};

export default Routes;