import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const initialUser = {
    name: 'Sarah Jenkins',
    email: 'sarah.j@school.edu',
    institution: 'Westwood High School',
    avatar: require('../assets/images/avatar.jpg'),
};

export default function EditProfile() {
    const router = useRouter();
    const [user, setUser] = useState(initialUser);

    const handleInputChange = (field: string, value: string) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        console.log('Updated user data:', user);
        Alert.alert('Profile Updated', 'Your changes have been saved successfully.');
        router.back();
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setUser(prev => ({ ...prev, avatar: { uri: result.assets[0].uri } }));
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable onPress={() => router.back()}>
                    <FontAwesome name="chevron-left" size={24} color="white" />
                </Pressable>
                <Text style={styles.headerTitle}>Edit Profile</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.avatarContainer}>
                <Image source={user.avatar} style={styles.avatar} />
                <Pressable style={styles.cameraButton} onPress={pickImage}>
                    <FontAwesome name="camera" size={20} color="white" />
                </Pressable>
                <Pressable onPress={pickImage}>
                    <Text style={styles.changePhotoText}>Change Photo</Text>
                </Pressable>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={user.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        placeholderTextColor="#9CA3AF"
                    />
                    <FontAwesome name="user" size={20} color="#9CA3AF" />
                </View>

                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={user.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                    />
                    <FontAwesome name="envelope" size={20} color="#9CA3AF" />
                </View>

                <Text style={styles.label}>Institution</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={user.institution}
                        onChangeText={(text) => handleInputChange('institution', text)}
                        placeholderTextColor="#9CA3AF"
                    />
                    <FontAwesome name="graduation-cap" size={20} color="#9CA3AF" />
                </View>

                <Link href="/(tabs)/settings/password" asChild>
                    <Pressable style={styles.passwordContainer}>
                        <View style={styles.passwordIcon}>
                            <FontAwesome name="lock" size={24} color="white" />
                        </View>
                        <View style={styles.passwordInfo}>
                            <Text style={styles.passwordText}>Password</Text>
                            <Text style={styles.passwordSubtext}>
                                Last changed 3 months ago
                            </Text>
                        </View>
                        <View style={styles.updateContainer}>
                            <Text style={styles.updateText}>Update</Text>
                            <FontAwesome name="chevron-right" size={20} color="#3B82F6" />
                        </View>
                    </Pressable>
                </Link>
            </View>

            <Pressable style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
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
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#3B82F6',
    },
    cameraButton: {
        position: 'absolute',
        bottom: 40,
        right: 110,
        backgroundColor: '#3B82F6',
        borderRadius: 20,
        padding: 10,
    },
    changePhotoText: {
        color: '#3B82F6',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    form: {
        flex: 1,
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
    passwordContainer: {
        backgroundColor: '#192b33',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 20,
    },
    passwordIcon: {
        backgroundColor: '#3B82F6',
        borderRadius: 10,
        padding: 10,
        marginRight: 15,
    },
    passwordInfo: {
        flex: 1,
    },
    passwordText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    passwordSubtext: {
        color: '#94A3B8',
        fontSize: 12,
    },
    updateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    updateText: {
        color: '#3B82F6',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
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