import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../utils/colors';

const InlineText = ({ text }) => {
    return (
        <View style={styles.inlineText}>
            <View style={styles.line}></View>
            <View style={{ marginHorizontal: 10 }}>
                <Text style={styles.inlineTextText}>{text}</Text>
            </View>
            <View style={styles.line}></View>
        </View>
    );
};

export default InlineText;

const styles = StyleSheet.create({
    inlineText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        borderWidth: 0.5,
        flex: 1,
        height: 0,
        borderColor: colors.lightGrey,
    },
    inlineTextText: {
        fontWeight: '600',
        color: colors.deepGrey,
    }
});