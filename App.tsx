import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Minimum 4 characters')
    .max(24, 'Maximum 24 characters')
    .required('Please enter password length'),
});

const lightTheme = {
  background: '#FFFFFF',
  text: '#000000',
  inputBorder: '#999999',
  inputBackground: '#F3F4F6',
  checkboxBorder: '#3B82F6',
  checkboxFill: '#3B82F6',
  passwordText: '#10B981',
};

const darkTheme = {
  background: '#121212',
  text: '#FFFFFF',
  inputBorder: '#666666',
  inputBackground: '#1E1E1E',
  checkboxBorder: '#3B82F6',
  checkboxFill: '#3B82F6',
  passwordText: '#34D399',
};

export default function App() {
  const darkMode = useColorScheme() === 'dark';
  const theme = darkMode ? darkTheme : lightTheme;

  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const generatedPasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (upperCase) characterList += upperCaseChars;
    if (lowerCase) characterList += lowerCaseChars;
    if (numbers) characterList += digitChars;
    if (symbols) characterList += specialChars;

    if (!characterList) {
      alert('Please select at least one checkbox');
      return;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const resetPasswordState = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(false);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.scrollViewStyle}>
        <View style={styles.formContainer}>
          <Text style={[styles.title, {color: theme.text}]}>
            Password Generator
          </Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              generatedPasswordString(+values.passwordLength);
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <Text style={[styles.label, {color: theme.text}]}>
                    Password Length
                  </Text>
                  <TextInput
                    style={[
                      styles.inputStyle,
                      {
                        borderColor: theme.inputBorder,
                        backgroundColor: theme.inputBackground,
                        color: theme.text,
                      },
                    ]}
                    keyboardType="numeric"
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Enter length (4-24)"
                    placeholderTextColor={darkMode ? '#999' : '#666'}
                  />
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                </View>

                <View style={styles.checkboxWrapper}>
                  <BouncyCheckbox
                    isChecked={lowerCase}
                    onPress={(isChecked: boolean) => setLowerCase(isChecked)}
                    text="Include Lowercase"
                    fillColor={theme.checkboxFill}
                    unFillColor={theme.background}
                    iconStyle={{borderColor: theme.checkboxBorder}}
                    textStyle={[styles.checkboxText, {color: theme.text}]}
                  />
                  <BouncyCheckbox
                    isChecked={upperCase}
                    onPress={(isChecked: boolean) => setUpperCase(isChecked)}
                    text="Include Uppercase"
                    fillColor={theme.checkboxFill}
                    unFillColor={theme.background}
                    iconStyle={{borderColor: theme.checkboxBorder}}
                    textStyle={[styles.checkboxText, {color: theme.text}]}
                  />
                  <BouncyCheckbox
                    isChecked={numbers}
                    onPress={(isChecked: boolean) => setNumbers(isChecked)}
                    text="Include Numbers"
                    fillColor={theme.checkboxFill}
                    unFillColor={theme.background}
                    iconStyle={{borderColor: theme.checkboxBorder}}
                    textStyle={[styles.checkboxText, {color: theme.text}]}
                  />
                  <BouncyCheckbox
                    isChecked={symbols}
                    onPress={(isChecked: boolean) => setSymbols(isChecked)}
                    text="Include Symbols"
                    fillColor={theme.checkboxFill}
                    unFillColor={theme.background}
                    iconStyle={{borderColor: theme.checkboxBorder}}
                    textStyle={[styles.checkboxText, {color: theme.text}]}
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}>
                    <Text style={styles.buttonText}>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.resetButton]}
                    onPress={() => {
                      handleReset();
                      resetPasswordState();
                    }}>
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                </View>

                {isPassGenerated && (
                  <View style={styles.resultBox}>
                    <Text style={[styles.resultText, {color: theme.text}]}>
                      Generated Password:
                    </Text>
                    <Text
                      selectable
                      style={[
                        styles.passwordText,
                        {color: theme.passwordText},
                      ]}>
                      {password}
                    </Text>
                  </View>
                )}
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollViewStyle: {padding: 20},
  formContainer: {marginTop: 30},
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputWrapper: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputStyle: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
  checkboxWrapper: {
    marginTop: 10,
    gap: 10,
  },
  checkboxText: {
    textDecorationLine: 'none',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#3B82F6',
    padding: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  resultBox: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '600',
  },
  passwordText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
