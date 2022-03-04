//import  async-storage  from '@react-native-community/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';

  const armazenarUserLogin = (chave, valor) => {
    //AsyncStorage.setItem(chave, valor)
    AsyncStorage.setItem(chave, valor)
      console.log('INSERIR VALOR LOGIN: chave: store ', valor)
  }

  const buscarUserLogin = async (value) => {
    const valor = await AsyncStorage.getItem(value)
    console.log('BUSCAR USER LOGIN: ', valor )
    return valor;
  }

  const removeUserLogin = async () => {
    await AsyncStorage.removeItem('store')
    console.log('DELETEUSER LOGIN: ')
  }

  const armazenarPremiumUser = (chave, valor) => {
    //AsyncStorage.setItem(chave, valor)
    AsyncStorage.setItem(chave, valor)
      console.log('INSERIR armazenarPremiumUser: chave: premium ', valor)
  }

  const buscarPremiumUser = async (value) => {
    const valor = await AsyncStorage.getItem(value)
    console.log('BUSCAR buscarPremiumUser: ', valor )
    return valor;
  }

  const removePremiumUser = async () => {
    await AsyncStorage.removeItem('premium')
    console.log('removePremiumUser: ')
  }


export default {
    armazenarUserLogin,
    buscarUserLogin,
    removeUserLogin,
    armazenarPremiumUser,
    buscarPremiumUser,
    removePremiumUser
}  