import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

export default function Password() {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdatePassword = () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New password and confirm password do not match.');
            return;
        }
        console.log('Updating password...');
        Alert.alert('Password Updated', 'Your password has been changed successfully.');
        router.back();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <FontAwesome name="chevron-left" size={24} color="white" />
                </Pressable>
                <Text style={styles.headerTitle}>Change Password</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Current Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="Enter your current password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry
                    />
                    <FontAwesome name="lock" size={20} color="#9CA3AF" />
                </View>

                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Enter your new password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry
                    />
                    <FontAwesome name="lock" size={20} color="#9CA3AF" />
                </View>

                <Text style={styles.label}>Confirm New Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm your new password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry
                    />
                    <FontAwesome name="lock" size={20} color="#9CA3AF" />
                </View>
            </View>

            <Pressable style={styles.saveButton} onPress={handleUpdatePassword}>
                <Text style={styles.saveButtonText}>Update Password</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101c22',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
        marginTop: 50
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    form: {
        flex: 1,
        marginTop: 30,
    },
    label: {
        color: '#94A3B8',
        fontSize: 14,
        marginBottom: 5,
    },
    inputContainer: {
        backgroundColor: '#192b33',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        paddingVertical: 15,
    },
    saveButton: {
        backgroundColor: '#3B82F6',
        borderRadius: 30,
        paddingVertical: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});