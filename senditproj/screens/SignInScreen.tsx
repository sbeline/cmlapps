// SignInScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

interface SignInScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const SignInScreen: React.FC<SignInScreenProps> = ({ navigation }) => {
  const { state, login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);

      // Replace 'your-api-endpoint' with the actual authentication API endpoint
      const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email,password }),
      });

    console.log("response statu:", response.status);
    if (response.ok || response.status === 201) {
        // Check if the response body exists
        const responseBody = await response.text();
  
        if (responseBody) {
          const user = JSON.parse(responseBody) as User;
  
          console.log('User Information:', user);
  
          // Continue with your success logic
        } else {
          console.log('Empty Response Body');
  
          // Handle empty response
          Alert.alert('Sign In Failed', 'Unexpected response from the server');
        }
      } else {
        console.log('Error Response:', response);
  
        // Handle unsuccessful sign-in (e.g., incorrect credentials)
        Alert.alert('Sign In Failed', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Sign In error:', error);
      Alert.alert('Error', 'An error occurred while attempting to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
         <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign In" onPress={handleSignIn} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default SignInScreen;
