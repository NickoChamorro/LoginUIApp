import { Text, View, Button, Alert } from 'react-native';

import { firebaseConfig } from '../../config/FirebaseConfig.js';
import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const signout = () =>{
        signOut(auth)
        .then(() => {
            console.log('signOut');
            navigation.navigate('Login');
        })
        .catch(error => {
            console.log(error);
            Alert.alert(error.message);
            navigation.navigate('Login');
        })
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button 
            onPress={signout}
            title="Sign out"
            color="#3498db"
        />
      </View>
    );
};

export default HomeScreen;