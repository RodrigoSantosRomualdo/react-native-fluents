import React, {useEffect, useState  } from 'react';
import { View, Text, Alert, ScrollView, FlatList, TouchableOpacity, Modal, Pressable, Button, TextInput, StyleSheet  } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import storegeUser from '../../services/storegeUser';
import { homeStyle } from './homeStyle';


/*import { ActivityIndicator } from 'react-native-paper';
import { homeStyle } from './homeStyle';
import apiTemas from './../../services/temas';

import storegeUser from '../../services/storegeUser';
import apiComparaText from '../../services/compareText';
import * as Progress from 'react-native-progress';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Sound from 'react-native-sound';
import index from '../../config/index.json'

import Voice from 'react-native-voice';
	let audio;
	let textInglesComparacao;
*/
//import { homeStyle } from './homeStyle';


import apiTemas from './../../services/temas';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import apiComparaText from '../../services/compareText';
import index from '../../config/index.json'
import * as Progress from 'react-native-progress';
import Sound from 'react-native-sound';

import Voice from 'react-native-voice';
	let audio;
	let textInglesComparacao;    


export default function HomeNovo( props ) {
        //console.log('PROPS navigation ------------------->>>>>>>>>>>>>>>>>>>>>>. ', props?.route?.params)
  // INICIO SPEECH
  
  const [nivelDisponivel, setNivelDisponivel] = useState();
  const [nivelDisponivelString, setNivelDisponivelString] = useState();
  const [exercicio, setExercicio] = useState();

  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [resultApiString, setResultApiString] = useState();
  const [microphoneValue, setMicrophoneValue] = useState(false)
  const [phoneValue, setPhoneValue] = useState(false)
  const [valueText, setValueText] = useState()
  const [resultSucesso, setResultSucesso] = useState(false);
  const [resultInsucesso, setResultInsucesso] = useState(false);
  const [mostraAudioMic, setMostraAudioMic] = useState(false);
  const [progressoBarra, setProgressoBarra] = useState(0.0)
  const [loadingApi, setLoadingApi] = useState(false)
const [audioAtivado, setAudioAtivado] = useState(false);
  const [micAtivado, setMicAtivado] = useState(false);

// FIM SPEECH

  const navigation = useNavigation();
  const [temas, setTemas] = useState();
  const [modalVisibleNivel, setModalVisibleNivel] = useState(false);
  const [temasNivel, setTemasNivel] = useState();
  const [temaEscolhido, setTemaEscolhido] = useState();
  const [pages, setPages] = useState(1)

  const [modalVisibleSpeech, setmodalVisibleSpeech] = useState(false);  

  useEffect(() => {
    (async () => {
        await setTemas();
        await setTemasNivel();
        await setTemaEscolhido();

        console.log('------ CHAMOU O USEEFFECT QUANDO VOLTA DA TELA SPEECH ------')
        const resultTemas = await apiTemas.post('tema/buscar', {padrao: index.padrao,})
        console.log('resultTemas.data ',resultTemas.data[0].nome)
        setTemas(resultTemas.data)
        console.log('Recarregou o USEEFFECT HOME')
    })();
}, [props?.route?.params?.renderizar])  

useEffect(() => {
  //Setting callbacks for the process status
  Voice.onSpeechStart = onSpeechStart;
  Voice.onSpeechEnd = onSpeechEnd;
  Voice.onSpeechError = onSpeechError;
  Voice.onSpeechResults = onSpeechResults;
  Voice.onSpeechPartialResults = onSpeechPartialResults;
  Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

  return () => {
    //destroy the process after switching the screen
    Voice.destroy().then(Voice.removeAllListeners);
  };
}, []);

  

  async function modalTrue(temaSelecionado) {
      await setExercicio();
      setPages(1)
      setModalVisibleNivel(true)
      console.log('temaEscolhido: ',temaSelecionado)
      setTemaEscolhido(temaSelecionado)
      const resultTemas = await apiTemas.post('tema-nivel/buscar',{padrao: index.padrao, tema_aprendizado: temaSelecionado } )
         // console.log('resultTemas.data ',resultTemas.data[0].nome)
         setTemasNivel(resultTemas.data)
      //navigation.navigate('Exercise Page', {aprender: })
  }

  async function sendSpeech(nivel_disponivel, ordem) {
    setLoadingApi(true)
   console.log('nivel_disponivel ---------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', nivel_disponivel)
    console.log('ordem ---------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', ordem)
    await setNivelDisponivel('')
    await setNivelDisponivelString('')
    await setExercicio('')
    //console.log('ESTA VAZIO ===>>> ',exercicio)
    if (exercicio !== undefined) {
    //  console.log('PASSOU NO IFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
      await setExercicio('')
    }
   // console.log('nivel_disponivel ---------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', nivel_disponivel)
   // console.log('nivel_disponivel ---------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ', ordem)
    await setModalVisibleNivel(false)
    //await setTemas(false)
    await setTemasNivel(false)
    await setmodalVisibleSpeech(true)
    

    const result = await apiTemas.post('atividade/buscar-atividade', {
      padrao: index.padrao,
      tema_aprendizado: temaEscolhido,
      nivel_disponivel: nivel_disponivel,
      ordem: pages
    })
    await setNivelDisponivel(ordem)
    await setNivelDisponivelString(nivel_disponivel)
    //console.log('data  /////////////////////------------>>>>>>>>>>>>>...',result.data)
    await setExercicio(result.data);
    setLoadingApi(false)
   // console.log('----------------------->>> ', exercicio)

    //navigation.navigate('Exercise Page', {aprender: temaEscolhido, nivel_disponivel: nivel_disponivel, nivel_number: ordem })
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////INICIO SPEECH MODAL ///////////////////////////////////////////////////////////




  if(modalVisibleNivel) {
      return <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleNivel}
        onRequestClose={() => {
          //Alert.alert("AA Modal has been closed.");
          setModalVisibleNivel(!modalVisibleNivel);
        }}
      >
        <View style={stylesCreate.centeredView}>
          <View style={stylesCreate.modalView}>
            <Text style={stylesCreate.modalText}>Selecione o Nível {}</Text>
    
            {temasNivel && 
               <FlatList 
               data={temasNivel}
               keyExtractor={(item) => item._id.toString()}
               style={{width: '100%', height: '100%'}}
               showsHorizontalScrollIndicator={false}
               renderItem={({ item }) => (
                  <TouchableOpacity style={{marginTop: '5%' ,borderRadius: 35,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, 
                  backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center',}} 
                  onPress={() => sendSpeech(item.nivel_disponivel, item.ordem)}>
                      <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>{item.nivel_disponivel}</Text>
                  </TouchableOpacity>
               )}                
               />
          }
          
          </View>
        </View>
      </Modal>
    }

    /*
                 <Text>Selecione o que vamos aprender</Text>
<TouchableOpacity style={{marginTop: '8%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, 
              backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center',}} onPress={() => navigation.navigate('Exercise Page', {aprender: 'First meeting'})}>
                  <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>First meeting</Text>
              </TouchableOpacity>
              

    */

    async function  verificacaoPremium(nomeTema) {
      const resultbuscarPremiumUser = await storegeUser.buscarPremiumUser('premium');
      console.log('resultbuscarPremiumUser ', resultbuscarPremiumUser)
      modalTrue(nomeTema)

      /* DESATIVADO O PREMIUM AGORA VAI SER APENAS ANUNCIO
      if (nomeTema === "First meeting") {
        modalTrue(nomeTema)
      } else if (resultbuscarPremiumUser  === true || resultbuscarPremiumUser  === 'true') {
        modalTrue(nomeTema)
      } else {
        return Alert.alert(
          "Mensagem",
          `Você ainda não é Premium! No momento só está disponível o tema First meeting. Aproveite agora a super promoção por apenas 9,99 R$`,
          [
            {
              text: "Ok",
              onPress: () =>  navigation.navigate('Pagamento')
            }
          ]
        )
      } */
    }

    const compareText = async (textInglesComparacao,textUserString) => {
      // resultApiString, setResultApiString
      //console.log('CHAMOU COMPARE TEXT' , textIngles)
      console.log('results textString: ', textUserString)
      //let teste = ["days of the week"]
      //console.log('exercicio?.nome_exercicio_ingles: ', exercicio.nome_exercicio_ingles)
    
      console.log('DADOS DO INGLES ', textInglesComparacao)
      const response = await  apiComparaText.post("",
       {
        padrao: index.padrao,
        textIngles: textInglesComparacao, 
        speechTextUser : textUserString
      })
      setProgressoBarra(1)
      setResultApiString(response.data)
      console.log(response.data)
      console.log('USESTATE: ', resultApiString) 
  
      setMicrophoneValue(false)
  
      console.log('ENTROU NO FORAAAAAAAAAAA' , response.data.error)
      
      if (response.data.error  === false  && response.data.message === "Processado com sucesso" && response.data.result === "Sucesso") {
        setMostraAudioMic(true)  // desabilita o microphone e Fone
        
        console.log('ENTROU NO IF IFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
        //resultSucesso, setResultSucesso
        return setResultSucesso(true)
      } else if (response.data.error  === false  && response.data.message === "Processado com sucesso" && response.data.result === "Erro Similaridade")  {
        setMostraAudioMic(true)  // desabilita o microphone e Fone
        console.log('ENTROU NO ELSE')
        return setResultInsucesso(true)
        // resultInsucesso, setResultInsucesso
      }
      //  && response.data.message === "processado com sucesso" && response.data.result === "Sucesso"
    }

    const funcaoNext = () => {
      setResultSucesso(false)
      setResultInsucesso(false)
      setMostraAudioMic(false)
      setLoadingApi(true)
      console.log("EXECUTOU A FUNCAO NEXT")
      const soma = pages + 1;
      setPages(soma)
      buscarExercicio(soma)
    }
  
    const funcaoPreveios = () => {
      setResultSucesso(false)
      setResultInsucesso(false)
      setMostraAudioMic(false)
      console.log("EXECUTOU A FUNCAO funcaoPreveios ===================>>>>>>>>>>>>>>>>>>>.    pages    ", pages)
      if (pages === 0) {
        return Alert.alert(
          "Atenção", "Você está no exericio 1", [
            { text: "Ok", onPress: () => console.log('Tentar novamente') } ] )
      } else {
        setLoadingApi(true)
        const subtracao = pages - 1;
        setPages(subtracao)
        console.log("BUSCANDO PAGES ", pages)
        buscarExercicio(subtracao)
      }
    }

    const buscarExercicio = async (ValorPages) => {
      const result = await apiTemas.post('atividade/buscar-atividade', {
        padrao: index.padrao,
        tema_aprendizado: temaEscolhido,
        nivel_disponivel: nivelDisponivelString,
        ordem: ValorPages
      })

      console.log('----------///---- tema_aprendizado ', temaEscolhido  )
      console.log('----------///---- nivel_disponivel ', nivelDisponivelString  )
      console.log('----------///---- ordem ', ValorPages  )
      
      console.log('data  ------------>>>>>>>>>>>>>...',result.data)
      if (result.data.message === "Nivel Finalizado!") {
        let resultSomaNivel = await nivelDisponivel + 1;
        let stringResultSomaNivel = await `Nível ${resultSomaNivel}`
        //const resultNivelString = `Nível ${nivelDisponivel}`;
        console.log('----------------------->>>> resultSomaNivel ', nivelDisponivel , ' STRING: ', stringResultSomaNivel )
        await setNivelDisponivelString(stringResultSomaNivel)
        await setNivelDisponivel(resultSomaNivel)
        await setPages(1)
  
        console.log('O QUE ESTÀ SENDO ENVIADO PARA API DE NIVEL:::: ', stringResultSomaNivel)
        const result = await apiTemas.post('atividade/buscar-atividade', {
          padrao: index.padrao,
          tema_aprendizado: temaEscolhido,
          nivel_disponivel: stringResultSomaNivel,
          ordem: 1
        })
  
        if (result.data.message === "Nivel Finalizado!") {
      
          setLoadingApi(false)
          return Alert.alert(
            "Parabéns", `Você finalizou o tema ${temaEscolhido}. Vamos selecionar um novo tema para aprender!`, 
  [{ text: "Ok", onPress: setmodalVisibleSpeech(false)   } ] )  
            // [{ text: "Ok", onPress: () => navigation.navigate('O que vamos aprender hoje?', { renderizar: true} ) } ] )
        } else {
          Alert.alert(
            "Parabéns", `Você agora passou para o ${stringResultSomaNivel}.`, 
  [{ text: "Ok", onPress: () => console.log('FINALIZOU O NIVEL'),  }] )
          setExercicio(result.data)
          setLoadingApi(false)
        }
        
  
      } else {
        setExercicio(result.data)
        setLoadingApi(false)
      }
      
    }


    function playSound(url) {
      setPhoneValue(true)
      console.log('ENTROU AQUI playSound')
      audio = new Sound(url,'', (error, sound) => {
        if (error) {
          alert('error'+error+message)
        }
        audio.play(() => {
          audio.release();
          setPhoneValue(false)
        })
      }) 
    }

    const audioAtivando = () => {
      //const [audioAtivado, 
      setAudioAtivado(false);
      //const [micAtivado, 
      //setMicAtivado(true);
      playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)
    }

    const resetTelaTreino = () => {
      setProgressoBarra(0.0)
      setResultSucesso(false);
      setResultInsucesso(false);
      setMostraAudioMic(false);
    }
    // FUNCOES MICROFONE
   

    const onSpeechStart = (e) => {
      //Invoked when .start() is called without error
      //console.log('onSpeechStart: ', e);
      console.log('onSpeechStart')
      setProgressoBarra(0.3)
      setStarted('√');
    };
  
    const onSpeechEnd = (e) => {
      //Invoked when SpeechRecognizer stops recognition
      //console.log('onSpeechEnd: ', e);
      //console.log('FINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUIFINALIZOU AQUI')
      //console.log('VALUE results: ', results)
      console.log('onSpeechEnd')
      setProgressoBarra(0.9)
      setEnd('√');
    };
  
    const onSpeechError = (e) => {
      //Invoked when an error occurs.
      //console.log('onSpeechError: ', e);
      console.log('onSpeechError')
      setMicrophoneValue(false)
      setError(JSON.stringify(e.error));
      return Alert.alert(
        "Error",
        "Não foi possível reconhecer sua voz. Vamos tentar novamente",
        [
          {
            text: "Ok",
            onPress: () => console.log('Tentar novamente')
          }
        ]
      )
    };
  
    const onSpeechResults = async (e) => {
      //Invoked when SpeechRecognizer is finished recognizing
      //console.log('onSpeechResults: ', e);
      //console.log('onSpeechResults --------------->>>>>>> ')
      //const textingles =  "days of the week";
      setResults(e.value);
      
      console.log('CHAMOU API AGORA valueText ------->>>>>>...',  textInglesComparacao  )
      //let text = await 'teste' 
      compareText(textInglesComparacao, e.value)
    };
  
    const onSpeechPartialResults = (e) => {
      //Invoked when any results are computed
      //console.log('onSpeechPartialResults: ', e);
      setPartialResults(e.value);
      console.log('onSpeechPartialResults' , )
      setProgressoBarra(0.7)
      //compareText()
    };
  
    const onSpeechVolumeChanged = (e) => {
      //Invoked when pitch that is recognized changed
      //console.log('onSpeechVolumeChanged: ', e);
      //console.log('onSpeechVolumeChanged')
      setPitch(e.value);
    };
  
    const startRecognizing = async (textIngles) => {
      textInglesComparacao = textIngles;
      setProgressoBarra(0.1)
      //Starts listening for speech for a specific locale
      //await setValueText(textIngles)
      //console.log('textIngles: ', textIngles)
      setMicrophoneValue(true)
      
      
      try {
        await Voice.start('en-US');
        //await Voice.start('pt-BR');
        await setValueText('ATUALIZADO AQUI')
        setPitch('');
        setError('');
        setStarted('');
        setResults([]);
        setPartialResults([]);
        setEnd('');
        console.log('valueTextvalueTextvalueTextvalueText ', valueText)
        console.log('startRecognizing')
      } catch (e) {
        //eslint-disable-next-line
        console.error(e);
      }
    };
  
    const stopRecognizing = async () => {
      //Stops listening for speech
      try {
        await Voice.stop();
        console.log('stopRecognizing')
      } catch (e) {
        //eslint-disable-next-line
        //console.error(e);
      }
    };
  
    const cancelRecognizing = async () => {
      //Cancels the speech recognition
      try {
        await Voice.cancel();
        console.log('cancelRecognizing')
      } catch (e) {
        //eslint-disable-next-line
        //console.error(e);
      }
    };
  
    const destroyRecognizer = async () => {
      //Destroys the current SpeechRecognizer instance
      try {
        await Voice.destroy();
        setPitch('');
        setError('');
        setStarted('');
        setResults([]);
        setPartialResults([]);
        setEnd('');
        console.log('destroyRecognizer')
      } catch (e) {
        //eslint-disable-next-line
        //console.error(e);
      }
    };


    

    if(modalVisibleSpeech) {
      return <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleSpeech}
        onRequestClose={() => {
          //Alert.alert("AA Modal has been closed.");
          setmodalVisibleSpeech(!modalVisibleSpeech);
        }}
      > 
        <View style={stylesCreate.centeredView}>
          <View style={stylesCreate.modalView}>
            <View style={{backgroundColor: '#6877e8' , height: '100%', width: '100%'}}>
            {loadingApi &&
            <View style={{backgroundColor: "#6877e8", height: '100%', width: '100%',}}>
              <ActivityIndicator color="#FFF"  size="large" style={{marginTop: '45%'}}  />
        
            </View> }
            <ScrollView style={{margin: '1%'}}>
              <View style={{alignItems: 'center', marginTop: '10%' }}>
                <TouchableOpacity style={{marginTop: '5%', backgroundColor: '#FFFFFF', padding: 10, borderRadius: 5, width: '90%'}}>
                  <Text style={{backgroundColor: '#FFFFFF', fontWeight: '500', color: "#0b0e26", fontSize: 20}}>{exercicio?.nome_exercicio_ingles}</Text>
                  <Text style={{backgroundColor: '#FFFFFF', fontWeight: '500', color: "#0b0e26", fontSize: 14}}>{exercicio?.nome_exercicio_portugues}</Text>
                </TouchableOpacity>


                <TouchableOpacity style={{marginTop: '5%', backgroundColor: '#FFFFFF', padding: 7, borderRadius: 5, width: '88%',}}>
                  <Text style={{backgroundColor: '#FFFFFF', fontWeight: '300', color: "#0b0e26", fontSize: 18}}>{exercicio?.nome_exercicio_fala}</Text>
                </TouchableOpacity>
              </View>
              {!mostraAudioMic  && 
    <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: '35%'}}>
        
        {phoneValue === false ? 
        <View style={styles.backPhone}>
          <TouchableOpacity onPress={()=> audioAtivando() }>
            <FontAwesome5 name="headphones-alt" size={60} color="#FFFFFF" />
          </TouchableOpacity>
          
          </View>  :  <View style={styles.backPhone}>
           <FontAwesome5 name="assistive-listening-systems" size={25} color="#00ff00" style={{position: 'absolute', 
          alignItems: 'center', justifyContent: 'center', marginTop: '18%'}} />

          <TouchableOpacity onPress={()=> {return playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)}}>

            <FontAwesome5 name="headphones-alt" size={75} color="#00ff00" />
            
          </TouchableOpacity>

          </View> }

          
        <View style={[microphoneValue ? styles.backMicrofoneTrue : styles.backMicrofoneFalse]}>
          {microphoneValue ? (
            
        <TouchableOpacity onPress={() => startRecognizing(exercicio?.nome_exercicio_ingles)}>
          <FontAwesome5 name="microphone-alt" size={60} color="#00ff00" style={{width: 100}} />
          <Text style={{fontStyle: 'italic', color:"#FFF", marginRight: '30%', fontSize: 10}}>Listening</Text>
          <Progress.Bar color={'#00ff00'} progress={progressoBarra} width={45} />
          
        </TouchableOpacity> ) : (
        <TouchableOpacity onPress={() => startRecognizing(exercicio?.nome_exercicio_ingles)}>
          {!micAtivado && 
          <View>
            <FontAwesome5 name="microphone-alt" size={60} color="#FFFFFF" />
            </View>
          }
          
        </TouchableOpacity>
        )}
          
        </View>

    </View>
    }

  {resultSucesso &&  // setMostraAudioMic
      <View style={{marginTop: '25%', width: '98%', marginLeft: '1%', marginRight: '1%', alignItems: 'center'}}>
      <TouchableOpacity onPress={()=> {return playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)}}
      style={{backgroundColor: '#4d9e4d', borderRadius: 20, justifyContent: 'center', width: '100%'}}>
      <Text style={{color: '#FFF', fontWeight: '700', fontSize: 40, width:'95%',
      paddingBottom: 30,paddingTop: 30, marginLeft: '25%', marginRight: '25%' }}>Correto <FontAwesome5 name="headphones-alt" size={25} color="#E5E5E5" /></Text>
            
      </TouchableOpacity>

      <TouchableOpacity onPress={() => resetTelaTreino()}
      style={{ alignItems: 'center' ,backgroundColor: '#E5E5E5', borderRadius: 20, 
      justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: '10%'}}>
            <Text style={{color: '#000', fontWeight: '700', fontSize: 20}}>Treinar Novamente</Text>
      </TouchableOpacity>
      </View>
    }

    {resultInsucesso &&  
      <View style={{marginTop: '25%', width: '98%', marginLeft: '1%', marginRight: '1%', alignItems: 'center'}}>
      <TouchableOpacity onPress={()=> {return playSound(`https://stream-audio-react-native.herokuapp.com/tracks/${exercicio?.id_audio}`)}}
      style={{backgroundColor: 'red', borderRadius: 20, justifyContent: 'center', width: '100%'}}>
      <Text style={{color: '#FFF', fontWeight: '700', fontSize: 40, width:'95%',
      paddingBottom: 30,paddingTop: 30, marginLeft: '25%', marginRight: '25%' }}>Incorreto <FontAwesome5 name="headphones-alt" size={25} color="#E5E5E5" /></Text>
            
      </TouchableOpacity>

      <TouchableOpacity onPress={() => resetTelaTreino()}
      style={{ alignItems: 'center' ,backgroundColor: 'red', borderRadius: 20, 
      justifyContent: 'center', alignItems: 'center', width: '80%', marginTop: '10%'}}>
            <Text style={{color: '#000', fontWeight: '700', fontSize: 20}}>Tentar Novamente</Text>
      </TouchableOpacity>
      </View>
      
    }           
     </ScrollView>

     <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: '5%', marginLeft: '5%', marginBottom: '3%'}}>
      {pages !== 1 ? (
        <TouchableOpacity onPress={funcaoPreveios} style={{backgroundColor: '#E5E5E5', padding: 10, borderRadius: 5}}>
        <Text style={{fontSize: 20, fontWeight: '700', color: "#000000"}}>Previous</Text>
        </TouchableOpacity> ) : (
          <TouchableOpacity>
          
          </TouchableOpacity>
        )
      }
        
        <TouchableOpacity onPress={funcaoNext} style={{backgroundColor: '#E5E5E5', padding: 10, borderRadius: 5, width: '30%', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: "#000000"}}>Next</Text>
        </TouchableOpacity>
      </View>
    



    </View>
    
           
          </View>
        </View>
      </Modal>
    }

      

  return(
      <View style={homeStyle.container}>
 



          {!temas && 
              <View style={{justifyContent: 'center', alignItems: 'center', marginTop: '50%'}}>
                  <ActivityIndicator color="#FFF"  size="large"  />
              </View>
          }

          {temas && 
          <View>
            <View style={{width: '100%', alignItems: 'center', }}>
              <Text style={{fontSize: 20, fontWeight: '600', color: '#FFF', marginTop: '3%', marginBottom: '2%'}}>Selecione o tema para aprender</Text>
          </View>

          <FlatList 
               data={temas}
               keyExtractor={(item) => item._id.toString()}
               showsHorizontalScrollIndicator={false}
               style={{height: '92%'}}
               renderItem={({ item }) => (
                 
                  <TouchableOpacity style={{marginTop: '2%', marginBottom: '2%' ,borderRadius: 40,width: '80%', marginLeft: '10%', marginRight: '10%', height: 50, 
                  backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center',}} onPress={() => verificacaoPremium(item.nome) }>
                      <Text style={{fontSize: 20, fontWeight: '700', color: "#0b0e26"}}>{item.nome}</Text>
                  </TouchableOpacity>
               )}                
               />

          </View>
              
               
          }
         
      </View>
  )
}


const stylesCreate = StyleSheet.create({
    centeredView: {
      
      justifyContent: "center",
      alignItems: "center",
      //marginTop: 22,
      height: '100%',
      backgroundColor: '#040E2C'
    },
    centeredView2: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 0,
      height: 20,
      flex: 1, height: '100%',
      backgroundColor: '#6877e8'
      
    },
    modalView: {
      margin: 0,
      backgroundColor: "#6877e8",
      width: '100%',
      height: '100%',
      borderRadius: 20,
      padding: 2,
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
    modalView2: {
      margin: 20,
      //backgroundColor: "white",
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
    
    buttonClose: {
      backgroundColor: "#FFFFFF",
    },
    textStyle: {
      color: "#8B80FC",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 0,
      //textAlign: '',
      fontSize: 21,
      color: '#FFFFFF',
      fontWeight: '700'
    },
  
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//height: '80%',
		flexDirection: 'column',
		alignItems: 'center',
		padding: 5,
		backgroundColor: '#6877e8'
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 10,
	},
	titleText: {
		fontSize: 22,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	buttonStyle: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 15,
		padding: 10,
		backgroundColor: '#8ad24e',
		marginRight: 2,
		marginLeft: 2,
	},
	buttonTextStyle: {
		color: '#fff',
		textAlign: 'center',
	},
	horizontalView: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 0,
	},
	textStyle: {
		textAlign: 'center',
		padding: 12,
	},
	imageButton: {
		width: 50,
		height: 50,
	},
	textWithSpaceStyle: {
		flex: 1,
		textAlign: 'center',
		color: '#B0171F',
	},
	backMicrofoneTrue : {
		//backgroundColor: '#4cba2f', 
		width: '20%', 
		borderRadius: 50, 
		alignItems: 'center'
		
	},
	backMicrofoneFalse : {
		width: '20%', 
		borderRadius: 50, 
		alignItems: 'center'
	},
	backPhone : {
		width: '25%', 
		alignItems: 'center'
	}
});
