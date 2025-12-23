
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';

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

interface Class {
  id: number;
  name: string;
  time: string;
  room: string;
  students: number;
  image: any;
}

export default function MyClasses() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const handleEllipsisPress = (classItem: Class) => {
    if (selectedClass?.id === classItem.id) {
      setModalVisible(!modalVisible);
    } else {
      setSelectedClass(classItem);
      setModalVisible(true);
    }
  };

  const filteredClasses = classes.filter((classItem) =>
    classItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
      <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image source={user.avatar} style={styles.avatar} />
          <Text style={styles.headerTitle}>My Classes</Text>
        </View>
        <Pressable onPress={() => setSearchVisible(!searchVisible)}>
          <FontAwesome name="search" size={24} color="white" />
        </Pressable>
      </View>

      {searchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search classes..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      )}

      <View style={styles.divider} />

            <View style={styles.subHeader}>
                <Text style={styles.subHeaderTitle}>Fall Semester 2023</Text>
                <View style={styles.activeClassesContainer}>
                    <Text style={styles.activeClassesText}>3 Active Classes</Text>
                </View>
            </View>

            <View style={styles.classList}>
                {classes.map((item) => (
                    <View key={item.id} style={styles.classItem}>
                        <View style={styles.classInfo}>
                            <View style={styles.classStudents}>
                <FontAwesome name="users" size={12} color="#9CA3AF" />
                <Text style={styles.classStudentsText}>{item.students} Students</Text>
              </View>
              <Text style={styles.className}>{item.name}</Text>
              <Text style={styles.classTime}>{item.time} • {item.room}</Text>
              <Pressable style={styles.manageButton}>
                <Text style={styles.manageButtonText}>Manage Class</Text>
                <FontAwesome name="arrow-right" size={12} color="#3B82F6" />
              </Pressable>
              <Pressable onPress={() => handleEllipsisPress(item)} style={styles.ellipsis}>
                <FontAwesome name="ellipsis-v" size={24} color="white" />
              </Pressable>
              {selectedClass?.id === item.id && modalVisible && (
                <View onStartShouldSetResponder={() => true} style={styles.modalView}>
                  <Pressable
                    style={styles.modalOption}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <FontAwesome name="pencil" size={20} color="#9CA3AF" />
                    <Text style={styles.modalOptionText}>Edit Class Details</Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalOption}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <FontAwesome name="calendar" size={20} color="#9CA3AF" />
                    <Text style={styles.modalOptionText}>View Attendance</Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalOption}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <FontAwesome name="star" size={20} color="#9CA3AF" />
                    <Text style={styles.modalOptionText}>View Grades</Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalOption}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <FontAwesome name="trash" size={20} color="#EF4444" />
                    <Text style={[styles.modalOptionText, { color: '#EF4444' }]}>Delete Class</Text>
                  </Pressable>
                </View>
              )}
            </View>
            <Image source={item.image} style={styles.classImage} />
                    </View>
                ))}
            </View>

            <Link href="/new-class" style={styles.newClassButton}>
                <FontAwesome name="plus" size={24} color="white" />
                <Text style={styles.newClassButtonText}>New Class</Text>
            </Link>
      </ScrollView>
    </TouchableWithoutFeedback>
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
        marginBottom: 20,
        marginTop: 40,
    },
    divider: {
        height: 1,
        backgroundColor: '#273a45',
        marginBottom: 30,
        width: '100%',
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
        color: '#637588',
        fontSize: 16,
    },
    activeClassesContainer: {
        backgroundColor: '#192b33',
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
        backgroundColor: '#192b33',
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
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
    searchInput: {
        backgroundColor: '#192b33',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalView: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: '#192b33',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1000,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    modalOptionText: {
        color: 'white',
        marginLeft: 15,
        fontSize: 16,
    },
});