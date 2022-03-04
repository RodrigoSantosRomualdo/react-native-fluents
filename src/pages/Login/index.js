/*

 ----------------   NAÔ USADO MAIS     ---------------------- 


 ----------------   NAÔ USADO MAIS     ---------------------- 





 ----------------   NAÔ USADO MAIS     ---------------------- 



 ----------------   NAÔ USADO MAIS     ---------------------- 









 ----------------   NAÔ USADO MAIS     ----------------------
 
 

  ----------------   NAÔ USADO MAIS     ---------------------- 


   ----------------   NAÔ USADO MAIS     ---------------------- 


    ----------------   NAÔ USADO MAIS     ---------------------- 

*/










import React, { useState,useEffect} from 'react';
import { Formik, useFormik } from 'formik';
import { Provider as ParerProvider, Card, TextInput, Button} from 'react-native-paper';
import { Alert, StyleSheet, SafeAreaView, View, Text,Modal,Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage'
import * as apiLogin from '../../services/apiLogin';
import { useAuth } from '../../services/auth';
import { StoreProvider, useStore } from '../../services/store';
import { loginStyl } from './loginStyle';
import { theme } from '../../../appStyle';
import { HeaderComponent } from '../../components/Header';
import { registerStyle } from '../Register/regidterStyle';
import apiUsers from '../../services/users';
import storegeUser from '../../services/storegeUser';
import App from './../../../App';
import Home from './../Home';
import { NavigationContainer } from '@react-navigation/native'
import Routes from '../../routes';
//import RNRestart from 'react-native-restart';

export default function Login({navigation}) {
    
    const [modalVisibleRegister, setModalVisibleRegister] = useState(false);
    const [modalVisibleForgot, setModalVisibleForgot] = useState(false);
    const [state, setState] = useState(false);
    const [resultUser, setResultUser] = useState();
    const [nome, setNome] = React.useState('');
    //const [textInputValue, setTextInputValue] = React.useState('');
    //const [email, setEmail] = useState('');
    //const [password, setPassword] = useState();
    //const [confirmPass, setConfirmPass] = useState();

    

    useEffect(() => {
        (async() => {

        
        })();
    },[])
    

    const logando = (password) => {
        console.log('email ',  )
        console.log('password ', )
        //Alert.alert("Login")
    }

    const irRegister = () => {
        console.log('REGISTER ', )
        setModalVisibleRegister(true)
        
    }

    const irForgot = () => {
        console.log('forgot() ');
        setModalVisibleForgot(true)
    }

    function carregarPerfilLogin() {
        console.log('CARREGAR PERFIL')
  
       // RNRestart.Restart();
      } 
     

    const Login = () => {

        const formik = useFormik({
            initialValues: ({email: "" , password: ""}),
            onSubmit: async values => {

                try {
                    const result = await apiUsers.post('login',{
                        email: "rodriogo.s.romualdo@gmail.com",
                        password: "12345678"
                    })
                    console.log('result API: ',result.data.status)
                    console.log('result API 2: ',result.data.email)
                    if (result.data.status === "FAILED") {
                        console.log("Invalid credentials")
                        return Alert.alert(
                            "Error",
                            "Invalid credentials",
                            [
                                {
                                    text: "Ok",
                                    onPress: () => console.log('Tentar novamente')
                                }
                            ]
                        )
                    } else if (result.data.status === "SUCCESS" && result.data.email !== undefined) {
                        console.log('CAIU NO ELSE IF EMAIL')

                    
                        //storegeUser.armazenarUserLogin('store', result.data.email)
                        return Alert.alert(
                            //title
                            'Atenção',
                            //body
                            `Login realizado com sucesso, clique no Ok para carregar o seu perfil!`,
                            [
                              {
                                text: 'Ok', onPress: (() => carregarPerfilLogin()) ,
                              },
                            ],
                        )
                        
                        
		
                    }
                    
                   // storegeUser.armazenarUserLogin('store', 'rodrigo@gmail.com')
                } catch (error) {
                    return Alert.alert(
                        "Error",
                        "Ocorreu um erro, tente novamente",
                        [
                            {
                                text: "Ok",
                                onPress: () => console.log('Tentar novamente')
                            }
                        ]
                    )
                }
                console.log('... ', values)
            }
        })


        /*
        React.useEffect(() => {
            console.log('formik.values: ', formik.values)
        }, [formik.values]) */


        return(
           <View style={loginStyl.container}>
               {
                    // INICIO REGISTRAR USUARIO
                }
               <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    visible={modalVisibleRegister}
                    onRequestClose={() => {
                        setModalVisibleRegister(!modalVisibleRegister);
                    }}
                >
                    <View >
                    <View >
                    <SafeAreaView>
                <ScrollView>
                    <HeaderComponent title="Register"/>
                    <View style={registerStyle.container}>
                       
                        <TextInput label="Password" secureTextEntry={true}  right={<TextInput.Icon name="eye-off-outline" color={registerStyle.icon.color}/>}/>
                        <TextInput label="Confirm password" secureTextEntry={true} right={<TextInput.Icon name="eye-off-outline" color={registerStyle.icon.color}/>} />
                        

                        <Button mode="contained" style={registerStyle.button} onPress={() => irRegister()}>Register</Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
                        <Pressable
                        
                        onPress={() => setModalVisibleRegister(!modalVisibleRegister)}
                        >
                        </Pressable>
                    </View>
                    </View>
                </Modal>
                
            </View>

                {
                    // INICIO RECUPERAR SENHA
                }

                <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    visible={modalVisibleForgot}
                    onRequestClose={() => {
                        setModalVisibleForgot(!modalVisibleForgot);
                    }}
                >
                    <View >
                    <View >
                    <SafeAreaView>
                <ScrollView>
                    <HeaderComponent title="Forgot Password"/>
                    <View style={registerStyle.container}>
                        <TextInput label="Email" keyboardType="email-address"/>

                        <Button mode="contained" style={registerStyle.button} onPress={() => forgot()}>Forgot</Button>
                    </View>
                </ScrollView>
            </SafeAreaView>
                        <Pressable
                        
                        onPress={() => setModalVisibleForgot(!modalVisibleForgot)}
                        >
                        </Pressable>
                    </View>
                    </View>
                </Modal>
                
                </View>

                {
                    // INICIO LOGIN
                }

               <View style={loginStyl.view}>
                    
                <Card>
                        <Card.Title title="Fluents" titleStyle={loginStyl.cardTitle} ></Card.Title>
                        <Card.Content>
                                        <TextInput label="Email" 
                                        keyboardType="email-address"
                                        value={formik.values.email}
                                        onChangeText={formik.handleChange('email')} />
                                        
                                    <TextInput label="Password" secureTextEntry={true} 
                                    value={formik.values.password}
                                    onChangeText={formik.handleChange('password')}
                                    />
                                    <Button uppercase={false} style={loginStyl.cardButton} onPress={irForgot}>Forgot password</Button>
                                    <Button mode="contained" style={loginStyl.cardButton} onPress={formik.handleSubmit}>
                                    {formik.isSubmitting ? (<ActivityIndicator color="#FFF"  />) : (<Text>Login</Text>)}   
                                    
                                    </Button>
                                    {state && <Button style={loginStyl.cardText}>{state}</Button>} 
                                    
                                    <Button style={loginStyl.cardButton} onPress={() => irRegister()}>Register</Button>

                        </Card.Content>
                </Card>

                
               </View>

           </View>
        )
    }


    const Router = () => {
        const user = true;
        /*if () {
            return <ActivityIndicator style={{flex: 1, color: '#43bc70'}} />
        } */
        return  <Login />
    }

    return (
        <ParerProvider theme={theme} >
        <Login/>
        </ParerProvider>
    )

    
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
        centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22
        },
        modalView: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        },
        button: {
          borderRadius: 20,
          padding: 10,
          elevation: 2
        },
        buttonOpen: {
          backgroundColor: "#F194FF",
        },
        buttonClose: {
          backgroundColor: "#2196F3",
        },
        textStyle: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center"
        },
        modalText: {
          marginBottom: 15,
          textAlign: "center"
        }
})



/* 

const [state, setState] = useState(false);
    const [, { login }] = useAuth()

    const formik = useFormik({
        initialValues: {
            username: "test",
            password: "test"
        },
        onSubmit: async values => {
            try {
                const { data } = await apiLogin.login(values)
                login(data)
                console.log("AGORA FUNCIONOU AQUI API: ", data)
              } catch (error) {
                console.log('ERRO')
                setState('Login ou senha inválidos')
              }
        },
    })












<View>
                <Text>PAGE LOGIN</Text>
    
                {// state && <Text>{state}</Text>
                }
                <TextInput 
                style={styles.input}
                placeholder="USER"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
                />
                
                <TextInput
                style={styles.input}
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
                placeholder="SENHA"
                keyboardType="numeric"
                />
    
                <TouchableOpacity style={{backgroundColor: '#43bc70' , width: '93%', alignItems: 'center', 
                justifyContent: 'center', padding: 12, margin: 12, borderRadius: 5  }} 
                onPress={formik.handleSubmit}>
                   {formik.isSubmitting ? <ActivityIndicator color="#FFF"/> : <Text>Entrar</Text>}
                </TouchableOpacity>
    
            </View>*/