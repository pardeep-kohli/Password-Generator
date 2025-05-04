import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import * as Yup from 'yup';

const PasswordSchema = Yup.object({
  passwordLength: Yup.number(),
});
export default function App() {
  return (
    <View>
      <Text>Password Generator</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
