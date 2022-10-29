import React, { useState } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
// components
import InlineText from '../components/InlineText';
import Button from '../components/Button';
// assets
import loginImage from '../assets/login.webp';
import googleLogo from '../assets/google_logo.png';
import colors from '../utils/colors';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={loginImage}
                        style={styles.image}
                    />
                </View>
                <View style={styles.loginContainer}>
                    <Text style={styles.title}>India's #1 Food Delivery and Dining App</Text>
                    <InlineText text='Login or Signup' />
                    <View style={{ marginVertical: 10 }}>
                        <TextInput
                            placeholder='Email'
                            style={styles.input}
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                        <TextInput
                            placeholder='Password'
                            style={styles.input}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                        <Button text='Continue' style={{ marginVertical: 4 }} />
                    </View>
                    <InlineText text='or' />
                    <View style={styles.otherLoginContainer}>
                        <View style={styles.otherLoginButton}>
                            <Image
                                source={googleLogo}
                                style={styles.otherLoginButtonImage}
                            />
                        </View>
                        <View style={styles.otherLoginButton}>
                            <EntypoIcon name='dots-three-horizontal' size={20} color='black' />
                        </View>
                    </View>
                    <Text style={styles.policy}>By continuing you agree to our</Text>
                    <Text style={styles.policy}>Terms of Service Privacy Policy Content Policy</Text>
                </View>
            </View>
        </>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        borderColor: 'red',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    loginContainer: {
        flex: 1.35,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 15,
        color: '#000',
    },
    otherLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    otherLoginButton: {
        borderWidth: 1,
        width: 50,
        height: 50,
        borderRadius: 25,
        padding: 10,
        borderColor: colors.lightGrey,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 12
    },
    otherLoginButtonImage: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    policy: {
        textAlign: 'center',
        fontSize: 12,
        color: colors.deepGrey,
    },
    input: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === 'ios' ? 15 : 10,
        color: '#000',
        marginVertical: 2
    }
});