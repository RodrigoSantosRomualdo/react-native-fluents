import React, {useEffect, useState  } from 'react';
import { View, Text, Alert, ScrollView, FlatList, TouchableOpacity, Modal, Pressable, Button, TextInput, StyleSheet  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeNovo from '../HomeNovo';

export default function Home() {
    
    const navigation = useNavigation();

    return (
        <View style={{backgroundColor: '#6877e8', width: '100%', height: '100%'}} >
            <HomeNovo />
           
        </View>
    )
}