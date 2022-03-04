import React from 'react';
import {View, Text} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// NOVAS TELAS
//import HomeNovo from './pages/HomeNovo';

// TELAS ANTIGAS



import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

const HomeTabs = () => {
    return (
        <Tab.Navigator 
        initialRouteName=""
        activeColor={'#E5E5E5'}
        
        barStyle={{backgroundColor: '#6877e8',}}>
            
            <Tab.Screen name="Page2" component={Page2} 
            options={{
                tabBarLabel: "Home",
                tabBarIcon: () => (
                    <Icon name="home-variant-outline" color={'#E5E5E5'} size={24} />
                    )
                }} 
            />

            <Tab.Screen name="Page3" component={Page3} 
            options={{
                tabBarLabel: "Perfil",
                 
                tabBarIcon: () => (
                    <Ionicons name="person-circle-outline" size={24} color={'#E5E5E5'} />
                    )
                }} 
            />


        </Tab.Navigator>
    )
}

const RoutesOptions = () => {
    return (
             
            <Stack.Navigator>
                {/* Hometabs onde altero as telas */}
              <Stack.Screen
                name="Home"
                options={{headerShown: false}}
                component={HomeTabs}
                 />

                {/* Essas telas eu consigo usar o navigation */}
                <Stack.Screen
                name="Page1"
                options={{headerShown: false}}
                component={Page1}
                 />

    

            </Stack.Navigator>
            
          )
}

export default function Routes() {
    return(
        <RoutesOptions/>
    )
}
