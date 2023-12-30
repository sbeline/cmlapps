// HomeScreen.tsx
import React from 'react';
import { Button } from 'react-native';

interface HomeScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('LoginScreen', { name: 'Jane' })}
    />
  );
};

export default HomeScreen;
