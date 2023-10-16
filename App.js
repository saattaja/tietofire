import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { firestore, collection, addDoc, MESSAGES, serverTimestamp } from './firebase/Config';
import { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { QuerySnapshot, onSnapshot, query } from 'firebase/firestore';
import { ScrollView } from 'react-native';
import  Constants from 'expo-constants';
import { convertFirebaseTimeStampToJS } from './helpers/Functions';

export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const save = async() =>{
    const docRef = await addDoc(collection(firestore, MESSAGES),{
      text: newMessage,
      created: serverTimestamp()
    }).catch(error=>console.log(error))
    setNewMessage('')
    console.log('message saved')
  }

    useEffect(()=>{
      const q = query(collection(firestore, MESSAGES))

      const unsubscribe = onSnapshot(q,(querySnapshot)=>{
        const tempMessages = []

        querySnapshot.forEach((doc)=>{
          const messageObject = {
            id: doc.id,
            text: doc.data().text,
            created: convertFirebaseTimeStampToJS(doc.data().created)
          }
          tempMessages.push(messageObject)
        })
        
      })
        return()=>{
          unsubscribe()
        }
      
    },[])
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {
          messages.map((message)=>(
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))
        }
      </ScrollView>

      <TextInput placeholder='send message' 
      value={newMessage} 
      onChangeText={text=>setNewMessage(text)}></TextInput>
      <Button title='Send' type="button" onPress={save}></Button>
      
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message:{
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
   },
   messageInfo:{
    fontSize: 12
   }
});
