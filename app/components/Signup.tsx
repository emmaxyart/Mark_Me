
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { signUp } from '../utils/auth';

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof schema>;

interface SignupProps {
  onSwitchToLogin: () => void;
}

export default function Signup({ onSwitchToLogin }: SignupProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    try {
      signUp(data);
      onSwitchToLogin();
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <Text style={styles.subtitle}>Start your journey with us.</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleButton} onPress={onSwitchToLogin}>
          <Text style={styles.toggleText}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleButton, styles.activeToggleButton]}>
          <Text style={[styles.toggleText, styles.activeToggleText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>First Name</Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="John"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}

      <Text style={styles.label}>Last Name</Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Doe"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="words"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName.message}</Text>}

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="email-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="teacher@school.edu"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}

      <View style={styles.passwordLabelContainer}>
        <Text style={styles.label}>Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#325567" style={styles.inputIcon} />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#325567"
              secureTextEntry={!passwordVisible}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.supportContainer} onPress={onSwitchToLogin}>
        <Text style={styles.supportText}>Already have an account? </Text>
        <Text style={[styles.supportText, styles.supportLink]}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.loginButtonText}>Sign Up</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>Or continue with</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={20} color="white" />
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-apple" size={20} color="white" />
          <Text style={styles.socialButtonText}>Apple</Text>
        </TouchableOpacity>
      </View>
       <TouchableOpacity style={styles.supportContainer}>
         <Text style={styles.supportText}>Trouble signing In? </Text>
         <Text style={[styles.supportText, styles.supportLink]}>Contact Support</Text>
       </TouchableOpacity>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#192b33',
    borderRadius: 12,
    padding: 3,
    marginBottom: 26,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeToggleButton: {
    backgroundColor: '#13a4ec',
  },
  toggleText: {
    color: '#F9FAFB',
    fontSize: 16,
  },
  activeToggleText: {
    color: 'white',
  },
  label: {
    color: '#F9FAFB',
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#192b33',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 50,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
  passwordLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#0099ff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#344054',
  },
  dividerText: {
    color: '#9CA3AF',
    marginHorizontal: 16,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#192b33',
    paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    marginBottom: 30,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
    supportContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: "auto"
  },
  supportText: {
    color: '#9CA3AF',
  },
  supportLink: {
    color: '#0099ff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});