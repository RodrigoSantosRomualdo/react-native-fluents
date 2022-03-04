//import  async-storage  from '@react-native-community/async-storage'

//import { AsyncStorageUsuario } from 'react-native';

  const armazenarUserLogin = (chave, valor) => {
    //AsyncStorageUsuario.setItem(chave, valor)
    AsyncStorageUsuario.setItem(chave, valor)
      console.log('INSERIR VALOR LOGIN: chave: store ', valor)
  }

  const buscarUserLogin = async (value) => {
    const valor = await AsyncStorageUsuario.getItem(value)
    console.log('BUSCAR USER LOGIN: ', valor )
    return valor;
  }

  const removeUserLogin = async () => {
    await AsyncStorageUsuario.removeItem('store')
    console.log('DELETEUSER LOGIN: ')
  }

  const armazenarPremiumUser = (chave, valor) => {
    //AsyncStorageUsuario.setItem(chave, valor)
    AsyncStorageUsuario.setItem(chave, valor)
      console.log('INSERIR armazenarPremiumUser: chave: premium ', valor)
  }

  const buscarPremiumUser = async (value) => {
    const valor = await AsyncStorageUsuario.getItem(value)
    console.log('BUSCAR buscarPremiumUser: ', valor )
    return valor;
  }

  const removePremiumUser = async () => {
    await AsyncStorageUsuario.removeItem('premium')
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