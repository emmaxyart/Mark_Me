import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const user = {
    name: 'Alex Johnson',
    title: 'Senior Mathematics Teacher',
    avatar: require('../../../assets/images/avatar.jpg'),
};

export default function Settings() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Text style={styles.headerTitle}>Settings</Text>

            <View style={styles.profileContainer}>
                <Image source={user.avatar} style={styles.avatar} />
                <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{user.name}</Text>
                    <Text style={styles.profileTitle}>{user.title}</Text>
                </View>
                <Link href="/edit-profile">
                    <FontAwesome name="pencil" size={24} color="#3B82F6" />
                </Link>
            </View>

            <Text style={styles.sectionTitle}>ACCOUNT & PREFERENCES</Text>
            <View style={styles.card}>
                <Link href="/edit-profile" asChild>
                <Pressable style={styles.cardRow}>
                    <View style={styles.cardIcon}>
                        <FontAwesome name="user" size={20} color="#3B82F6" />
                    </View>
                    <Text style={styles.cardText}>Edit Profile</Text>
                    <FontAwesome name="chevron-right" size={20} color="#637588" />
                </Pressable>
                </Link>
                <View style={styles.divider} />
                <Pressable style={styles.cardRow}>
                    <View style={styles.cardIcon}>
                        <FontAwesome name="bell" size={20} color="#3B82F6" />
                    </View>
                    <Text style={styles.cardText}>Notification Settings</Text>
                    <FontAwesome name="chevron-right" size={20} color="#637588" />
                </Pressable>
            </View>

            <Text style={styles.sectionTitle}>SUPPORT & INFO</Text>
            <View style={styles.card}>
                <Pressable style={styles.cardRow}>
                    <View style={styles.cardIcon}>
                        <FontAwesome name="question-circle" size={20} color="#3B82F6" />
                    </View>
                    <Text style={styles.cardText}>Help & Support</Text>
                    <FontAwesome name="chevron-right" size={20} color="#637588" />
                </Pressable>
                <View style={styles.divider} />
                <Pressable style={styles.cardRow}>
                    <View style={styles.cardIcon}>
                        <FontAwesome name="info-circle" size={20} color="#3B82F6" />
                    </View>
                    <Text style={styles.cardText}>About MarkMe</Text>
                    <Text style={styles.versionText}>v1.0.2</Text>
                    <FontAwesome name="chevron-right" size={20} color="#637588" />
                </Pressable>
            </View>

            <Pressable style={styles.logoutButton}>
                <FontAwesome name="sign-out" size={24} color="#EF4444" />
                <Text style={styles.logoutButtonText}>Log Out</Text>
            </Pressable>

            <Text style={styles.footerText}>MarkMe Inc. © 2025</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101c22',
        padding: 20,
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
        marginTop: 45
    },
    profileContainer: {
        backgroundColor: '#192b33',
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    profileTitle: {
        color: '#94A3B8',
        fontSize: 14,
    },
    sectionTitle: {
        color: '#637588',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#192b33',
        borderRadius: 10,
        marginBottom: 30,
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    cardIcon: {
        backgroundColor: '#1E293B',
        borderRadius: 10,
        padding: 10,
        marginRight: 15,
    },
    cardText: {
        color: 'white',
        fontSize: 16,
        flex: 1,
    },
    versionText: {
        color: '#94A3B8',
        fontSize: 16,
        marginRight: 10,
    },
    divider: {
        height: 1,
        backgroundColor: '#273a45',
        marginHorizontal: 20,
    },
    logoutButton: {
        backgroundColor: '#192b33',
        borderRadius: 10,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    logoutButtonText: {
        color: '#EF4444',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    footerText: {
        color: '#637588',
        textAlign: 'center',
        marginBottom: 80,
    },
});