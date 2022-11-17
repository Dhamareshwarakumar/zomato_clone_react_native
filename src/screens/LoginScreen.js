import React, { useState } from 'react';
import {
    Image,
    Linking,
    Platform,
    Pressable,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// components
import InlineText from '../components/InlineText';
import Button from '../components/Button';
// assets
import loginImage from '../assets/login.webp';
import googleLogo from '../assets/google_logo.png';
import colors from '../utils/colors';
// redux
import { login } from '../features/authSlice';


const LoginScreen = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(store => store.auth.isAuthenticated);

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpHash, setOtpHash] = useState('');

    const loginWithOtp = () => {
        setLoading(true);
        axios.post('api/auth/login', { email })
            .then(res => {
                setOtpHash(res.data.otpHash);
            })
            .catch(err => {
                console.warn(err);
            })
            .finally(() => setLoading(false));
    };

    const verifyOtp =  () => {
        setLoading(true);

        axios.post('api/auth/otp', { otpHash, otp: Number(otp), email })
            .then(res => {
                setOtp('');
                setEmail('');
                setOtpHash('');
                console.log('[000] Token Received', res.data.token)
                dispatch(login({
                    email,
                    token: res.data.token
                }));
            })
            .catch(err => {
                console.warn(err);
            })
            .finally(() => setLoading(false));
    };

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
                    {otpHash === '' ? (
                        <>
                        <TextInput
                            placeholder='Email'
                            style={styles.input}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            editable={!loading}
                        />
                        <Button
                            text='Login with OTP'
                            style={{ marginVertical: 4, backgroundColor: loading ? '#f7746f' : '#E72444' }}
                            onPress={loginWithOtp}
                            disabled={loading}
                        />
                        </>
                    ) : (
                        <>
                        <TextInput
                            placeholder='OTP'
                            style={styles.input}
                            value={otp}
                            onChangeText={text => setOtp(text)}
                            editable={!loading}
                        />
                         <Button
                            text='Enter OTP'
                            style={{ marginVertical: 4, backgroundColor: loading ? '#f7746f' : '#E72444' }}
                            onPress={verifyOtp}
                            disabled={loading}
                        />
                        </>
                    )}
                    </View>
                    <InlineText text='or' />
                    <View style={styles.otherLoginContainer}>
                        <Pressable
                            style={styles.otherLoginButton}
                            onPress={() => Linking.openURL('https://2a05-49-205-103-254.in.ngrok.io/api/auth/google')}
                        >
                            <Image
                                source={googleLogo}
                                style={styles.otherLoginButtonImage}
                            />
                        </Pressable>
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

export default LoginScreen;

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