
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import Signup from './components/Signup';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.logoContainer}>
        <View style={styles.logoBackground}>
          <Ionicons name="school" size={40} color="#13a4ec" />
        </View>
      </View>

      <Text style={styles.brandName}> Markme</Text>
      <Text style={styles.title}>Welcome back</Text>

      {isLogin ? (
        <Login onSwitchToSignup={() => setIsLogin(false)} />
      ) : (
        <Signup onSwitchToLogin={() => setIsLogin(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101c22',
    paddingHorizontal: 24,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 20,
  },
  logoBackground: {
    backgroundColor: '#192b33',
    padding: 15,
    borderRadius: 15,
  },
  brandName: {
    color: '#F9FAFB',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
});