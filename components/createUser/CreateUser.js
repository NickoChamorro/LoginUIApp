import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

import { firebaseConfig } from '../../config/FirebaseConfig.js';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';

const CreateUser = () => {
    // Add name, email, emailVerified, password, phone number, uid, 
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleRegister = async () => {
        try {
            // Valida que se hayan ingresado todos los campos
            if (!name || !phoneNumber || !email || !password) {
                alert('Please enter all the fields');
                return;
            }
        
            // Valida que el número de teléfono tenga 10 dígitos
            if (phoneNumber.length !== 10) {
                alert('Please enter a valid phone number');
                return;
            }
        
            // Crea el usuario en Firebase
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Account created!');
                Alert.alert('Account created!');
                const user = userCredential.user;
                console.log(user)
                navigation.navigate('Login');
            })
            .catch(error => {
                console.log(error)
                Alert.alert(error.message)
            })
        
            // Agrega el nombre y número de teléfono del usuario a la base de datos
            /* await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
                name,
                phoneNumber,
            }); */
        
            // Haz algo con el usuario registrado
            console.log(userCredential.user);
        } catch (error) {
            console.error(error);
            alert('Ocurrió un error al registrarse, por favor intenta de nuevo');
        }
      };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View>
                    <Text style={styles.textInput}>Full name</Text>
                    <TextInput
                        placeholder="Full name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <Text style={styles.textInput}>Phone number</Text>
                    <TextInput
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        style={styles.input}
                    />
                    <Text style={styles.textInput}>Email</Text>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        style={styles.input}
                    />
                    <Text style={styles.textInput}>Password</Text>
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        style={styles.input}
                    />
                    <TouchableOpacity onPress={handleRegister} style={styles.button}>
                        <Text style={styles.buttonText}>Register Now</Text>
                    </TouchableOpacity>
                    <Text style={styles.leftText} onPress={() =>navigation.navigate('Login')}>Already have account? Login</Text>
                </View>
            </View>    
        </View>    
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    textInput:{
        fontSize: 17, 
        fontWeight: '400', 
        color: 'grey'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#4834d4',
        borderRadius: 5,
        marginVertical:  10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    leftText: {
        fontSize: 17, 
        color: '#202eb7',
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 10,    
    }

});    

export default CreateUser;