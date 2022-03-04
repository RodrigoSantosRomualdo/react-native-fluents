import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { Provider as ParerProvider, Appbar, Card, TextInput, Button, IconButton, Colors } from 'react-native-paper';
import { theme } from '../../../appStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import { registerStyle } from './regidterStyle';
import { HeaderComponent } from '../../components/Header';

export default function Register() {

    const _goBack = () => console.log('Went back');

    const Register = () => {
        return (
            
            <SafeAreaView>
                <ScrollView>
                    <HeaderComponent title="Register NOVO"/>
                    <View style={registerStyle.container}>
                        <TextInput label="Name"/>
                        <TextInput label="Email" keyboardType="email-address"/>
                        <TextInput label="Password" secureTextEntry={true}/>
                        <TextInput label="Confirm password" secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline" color={registerStyle.icon.color}/>} />

                        <Button mode="contained" style={registerStyle.button}>Register</Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
            
        )

    }

        return (
            <ParerProvider theme={theme} >
                <Register/>
            </ParerProvider>
        )
    
}