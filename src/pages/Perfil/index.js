import React, {useEffect, useState  } from 'react';
import { View, Text, Alert, ActivityIndicator, ScrollView, FlatList, TouchableOpacity, Modal, Pressable, Button, TextInput, StyleSheet  } from 'react-native';
import apiTemas from '../../services/temas';
import { useNavigation } from '@react-navigation/native';
import config from '../../config';
//import { WebView } from 'react-native-webview';
//import apiCheckout from '../../services/checkoutMP';
import apiUsers from '../../services/users';
import storegeUser from '../../services/storegeUser';
import moment from 'moment';
import index from '../../config/index.json'
export default function Perfil( props ) {

    const navigation = useNavigation();
    
    const [modalVisibleCheckout, setModalVisibleCheckout] = useState(false);
    const [urlCheckout, setUrlCheckout] = useState(null);
    const [resultPremium, setResultPremium] = useState(false);
    const [validadeDatePremium, setValidadeDatePremium] = useState();
    const [controleBackMP, setControleBackMP] = useState(1);
    const [dataPremium, setDataPremium] = useState('');

    
    useEffect(() => {
        (async () => {
            console.log("EXECUTOU O USEEFFECT  MERCADO PAGO")
            const dataPremium = await apiUsers.post('/datapremium',{padrao: index.padrao})
            console.log('dataPremium', dataPremium.data)
            const { data } = dataPremium.data;
            console.log('datadatadatadatadatadata ', data)
            await setDataPremium(data)
            //await storegeUser.armazenarPremiumUser('premium', 'false')
            const resultPremiumStorage = await storegeUser.buscarPremiumUser('premium')
            const email = await storegeUser.buscarUserLogin('store');
            console.log('resultPremium: ', resultPremiumStorage)
            console.log('resultPremiumStorage: ', )

           /* if (resultPremiumStorage === 'false') {
                 const data = await apiCheckout.post('',{
                     email: email
                 })
                 console.log(data.data)
                 setUrlCheckout(data.data)
            } else if (resultPremiumStorage === 'true') {
                console.log('EXISTE')
                setResultPremium(true)
                
                const findUSer = await apiUsers.post('finduser', {
                    email: email
                })
                console.log('findUSer: ', findUSer.data.data[0].data_premium)

                const dataMoment = moment(findUSer.data.data[0].data_premium).format("DD/MM/YYYY");
                //console.log('dataMoment: ', dataMoment)
                setValidadeDatePremium(dataMoment)
            }   */


            //storegeUser.armazenarPremiumUser()



            //const data = await apiCheckout.post('',{})
            //console.log(data.data)
            //setUrlCheckout(data.data)

            
          /*  let data = await fetch(config.urlCheckout, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify( { })
            }) 
            console.log('--->>> ',data) */
           

        })();
    }, []) 

    const compraNaoLiberado = () => {

        return Alert.alert(
			"Mensagem",
			`Não é possível comprar o pacote premium, apenas a partir do dia ${dataPremium}`,
			[
				{
					text: "Ok",
					onPress: () => console.log('Tentar novamente')
				}
			]
		)
    }

    // Mudança de estado de navegação
    async function  stateChange(state) {
        console.log('state ',state)
        let url=state.url;
        if (state.canGoBack == true && !url.includes('mercadopago')){
            console.log('ENTROU NO IF')
            if (url.includes('approved')) {
                const email = await storegeUser.buscarUserLogin('store');
                console.log('ENTROU DENTRO DO IF DO APROVED')
                await storegeUser.armazenarPremiumUser('premium', 'true')

                await apiUsers.post('premium', { email: email })
                //console.log('resultPremium ' , resultPremiumAPI)
                const findUSer = await apiUsers.post('finduser', {
                    email: email })

                const dataMoment = moment(findUSer.data.data[0].data_premium).format("DD/MM/YYYY");
                //console.log('dataMoment: ', dataMoment)
                await setValidadeDatePremium(dataMoment)
                await setResultPremium(true)
                await setModalVisibleCheckout(false)

                /*
                useEffect(() => {
                    (async () => {
                     

                    })();
                }, [])  */
                
            } else {
                navigation.navigate('O que vamos aprender hoje?', { renderizar: true} ) 
            }
        }  
    } 

    if(modalVisibleCheckout) {
        return ( <Modal
        animationType="slide"
        style={{backgroundColor: '#6877e8' }}
        transparent={true}
        visible={modalVisibleCheckout}
        onRequestClose={() => {
          //Alert.alert("AA Modal has been closed.");
          setModalVisibleCheckout(!modalVisibleCheckout);
        }}
      >
        {/*
    <WebView 
        originWhitelist={['*']}
        source={{ uri: urlCheckout }}
        style={{
            flex: 1
        }} 
        startInLoadingState={true}
        onNavigationStateChange={state=> stateChange(state)}
        />

    */ }
        
      </Modal>
      )
    }  
    
    async function modalCheckout() {
        setModalVisibleCheckout(true)
    /*    const data = await apiCheckout.post('',{})
        console.log(data.data)
        setUrlCheckout(data.data)  */

    }

    if (resultPremium) {
        return (
        <View style={{backgroundColor: '#6877e8', width: '100%', height: '100%'}}>
            <View style={{margin: '5%', marginTop: '10%'}}>
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 19}}>
                Parabéns, agora você é Premium!
                </Text>
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 15, marginTop: '3%'}}>
                Seus beneficios é válido até {validadeDatePremium}
                </Text>
                <View style={{marginTop: '5%'}}>
                    <Text style={{marginBottom: '2%', fontSize: 18, color: '#FFF'}}>Todos os temas liberados</Text>
                    <Text style={{marginBottom: '2%', fontSize: 18, color: '#FFF'}}>Ouvir audios ilimitados</Text>
                    <Text style={{marginBottom: '2%', fontSize: 18, color: '#FFF'}}>Testar sua fala ilimitado</Text>
                </View>
            </View>

            { /*
            <View style={{marginTop: '45%', marginLeft: '5%', marginRight: '5%'}}>
            <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 20}}>
                Parabéns agora você pode participar da promoção de indicação
                </Text>
                <TouchableOpacity style={{backgroundColor: '#7a9e2b', padding: 15, borderRadius: 30 }} onPress={() => modalCheckout()}>
                 <Text style={{fontSize: 30, color: '#FFF', fontWeight: '800'}}>Checkout Premium</Text>
                </TouchableOpacity>
            </View>
            */ }
        </View>
        )
    }
    //  Obtenha Premium e fique sem ver anúncio durante 1 ano por 9,99 R$
    return (
        <View style={{backgroundColor: '#6877e8', width: '100%', height: '100%'}}>
            
            <View style={{margin: '5%', marginTop: '10%'}}>
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 17}}>
                Premium liberado até {dataPremium}.
                </Text>
                <Text style={{color: '#FFF', fontWeight: 'bold', fontSize: 17}}>
                É possível acessar todos os temas sem limitação!
                </Text>
               
                <View style={{marginTop: '5%'}}>
                    <Text style={{marginBottom: '2%', fontSize: 18, color: '#FFF'}}>Todos os temas liberados</Text>
                    <Text style={{marginBottom: '2%', fontSize: 18, color: '#FFF'}}>Ouvir audios ilimitados</Text>
                    <Text style={{marginBottom: '2%', fontSize: 18, color: '#FFF'}}>Testar sua fala ilimitado</Text>
                </View>
            </View>

            <View style={{marginTop: '45%', marginLeft: '5%', marginRight: '5%'}}>

                <TouchableOpacity style={{backgroundColor: '#7a9e2b', padding: 15, borderRadius: 30 }} onPress={() => compraNaoLiberado()}>
                 <Text style={{fontSize: 30, color: '#FFF', fontWeight: '800'}}>Checkout Premium</Text>
                </TouchableOpacity>
            </View>
            
        </View>
      
    )

}

// <WebView source={{ uri: 'https://reactnative.dev/' }} />