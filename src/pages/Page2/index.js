import React from "react";
import {View, Text, TouchableOpacity} from 'react-native'
import { useNavigation } from "@react-navigation/native";
import Perfil from '../Perfil/index'


export default function Page2() {

    const navigation = useNavigation()

    return (
        <View>
            <Perfil />
            <Text>PAGE 2</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Page1',{})}>
                <Text>
                    PAGE 1
                </Text>
            </TouchableOpacity>
        </View>
    )
}