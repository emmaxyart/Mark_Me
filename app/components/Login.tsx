
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { logIn } from '../utils/auth';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

interface LoginProps {
  onSwitchToSignup: () => void;
}

export default function Login({ onSwitchToSignup }: LoginProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    try {
      logIn(data);
      router.push('/(tabs)/classes');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <>
      <Text style={styles.subtitle}>Streamline your classroom management.</Text>

      <View style={styles.toggleContainer}>
        <TouchableOpacity style={[styles.toggleButton, styles.activeToggleButton]}>
          <Text style={[styles.toggleText, styles.activeToggleText]}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={onSwitchToSignup}>
          <Text style={styles.toggleText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

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
        <TouchableOpacity>
          <Text style={styles.forgotText}>Forgot?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons name="lock-outline" size={20} color="#9CA3AF" style={styles.inputIcon} />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
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

      <TouchableOpacity style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.loginButtonText}>Log In</Text>
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
        <Text style={styles.supportText}>Trouble logging in? </Text>
        <Text style={[styles.supportText, styles.supportLink]}>Contact Support</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#0099ff',
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
  forgotText: {
    color: '#13a4ec',
    fontSize: 14,
    marginBottom: 8,
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
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  supportContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 28,
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