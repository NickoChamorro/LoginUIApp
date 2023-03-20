import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config/FirebaseConfig.js';

import { useNavigation } from '@react-navigation/native';


const LoginScreen2 = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const handleLogin = () => {
        // Aquí va la lógica de autenticación con email y contraseña
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Signed in!');
            Alert.alert('Signed in!');
            const user = userCredential.user;
            console.log(user)
            navigation.navigate('Home');
        })
        .catch(error => {
            console.log(error)
            Alert.alert(error.message)
        })
    };

    const handleGoogleLogin = async () => {

    };

    const handleFacebookLogin = async () => {

    };

    const forgotPassword = () => {
        Alert.alert('Check your inbox for an email we sent you to reset the password')
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.inputContainer}>
                <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleButton}>
                    <Image source={require('../../assets/google_icon.png')} style={styles.buttonImage} />
                    <Text style={styles.buttonText}>Log in with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFacebookLogin} style={styles.facebookButton}>
                    <Image source={require('../../assets/facebook_icon.png')} style={styles.buttonImage} />
                    <Text style={styles.buttonText}>Log in with Facebook</Text>
                </TouchableOpacity>

                <Text style={styles.divisionText}>Or</Text>

                <View>
                    <Text style={styles.textInput}>E-mail</Text>
                    <TextInput
                        placeholder="nombre@correo.com"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.textInput}>Password</Text>
                    <TextInput
                        placeholder="******"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>
                    
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.leftText} onPress={forgotPassword}>Forgot password?</Text>

                <Text style={styles.leftText} onPress={() =>navigation.navigate('CreateUser')}>Create new account</Text>
            
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
    logo: {
        width: 150,
        height: 150,
        marginBottom: 50,
    },
    textInput:{
        fontSize: 17, 
        fontWeight: '400', 
        color: 'grey'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#4834d4',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    divisionText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#202eb7',//'#dd4b39',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    facebookButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#202eb7',//'#3b5998',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    buttonImage: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    leftText:{
        fontSize: 17, 
        color: '#202eb7',
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 10,
    }
});

export default LoginScreen2;