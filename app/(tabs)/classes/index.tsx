
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const user = {
    name: 'John Doe',
    avatar: require('../../../assets/images/avatar.jpg'),
};

const classes = [
    {
        id: 1,
        name: 'Advanced Mathematics',
        time: '10:00 AM',
        room: 'Room 301',
        students: 24,
        image: require('../../../assets/images/math.jpg'),
    },
    {
        id: 2,
        name: 'English Literature',
        time: '01:00 PM',
        room: 'Room 204',
        students: 30,
        image: require('../../../assets/images/english.jpg'),
    },
    {
        id: 3,
        name: 'Physics Lab',
        time: '03:00 PM',
        room: 'Lab 4B',
        students: 18,
        image: require('../../../assets/images/physics.jpg'),
    },
];

export default function MyClasses() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image source={user.avatar} style={styles.avatar} />
                    <Text style={styles.headerTitle}>My Classes</Text>
                </View>
                <FontAwesome name="search" size={24} color="white" />
            </View>

            <View style={styles.subHeader}>
                <Text style={styles.subHeaderTitle}>Fall Semester 2023</Text>
                <View style={styles.activeClassesContainer}>
                    <Text style={styles.activeClassesText}>3 Active Classes</Text>
                </View>
            </View>

            <ScrollView style={styles.classList}>
                {classes.map((item) => (
                    <View key={item.id} style={styles.classItem}>
                        <View style={styles.classInfo}>
                            <View style={styles.classStudents}>
                                <FontAwesome name="users" size={12} color="#9CA3AF" />
                                <Text style={styles.classStudentsText}>{item.students} Students</Text>
                            </View>
                            <FontAwesome name="ellipsis-h" size={24} color="white" style={styles.ellipsis} />
                            <Text style={styles.className}>{item.name}</Text>
                            <Text style={styles.classTime}>{item.time} • {item.room}</Text>
                            <Pressable style={styles.manageButton}>
                                <Text style={styles.manageButtonText}>Manage Class</Text>
                                <FontAwesome name="arrow-right" size={12} color="#3B82F6" />
                            </Pressable>
                        </View>
                        <Image source={item.image} style={styles.classImage} />
                    </View>
                ))}
            </ScrollView>

            <Link href="/new-class" style={styles.newClassButton}>
                <FontAwesome name="plus" size={24} color="white" />
                <Text style={styles.newClassButtonText}>New Class</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    subHeaderTitle: {
        color: '#94A3B8',
        fontSize: 16,
    },
    activeClassesContainer: {
        backgroundColor: '#1E293B',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    activeClassesText: {
        color: '#3B82F6',
        fontSize: 12,
        fontWeight: 'bold',
    },
    classList: {
        flex: 1,
    },
    classItem: {
        backgroundColor: '#1E293B',
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    classInfo: {
        padding: 20,
        flex: 1,
    },
    classStudents: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#334155',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    classStudentsText: {
        color: '#9CA3AF',
        marginLeft: 5,
    },
    ellipsis: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    className: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 20,
    },
    classTime: {
        color: '#94A3B8',
        marginBottom: 10,
    },
    manageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0F172A',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#3B82F6',
    },
    manageButtonText: {
        color: '#3B82F6',
        marginRight: 5,
        fontWeight: 'bold',
    },
    classImage: {
        width: 100,
        height: '100%',
    },
    newClassButton: {
        backgroundColor: '#3B82F6',
        padding: 15,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 80,
        right: 20,
    },
    newClassButtonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: 'bold',
    },
});