import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Text, Header, Form, Item, Label, Input, Button} from 'native-base';
import * as yup from 'yup';
import {Formik} from 'formik';
import {loginAction} from '../redux/actions/auth';

import logoFb from '../assets/images/fbLogo.png';

const schemaValidation = yup.object().shape({
  email: yup
    .string()
    .email('Masukkan alamat email dengan benar')
    .required('Email dibutuhkan'),
  password: yup
    .string()
    .min(8, 'Password setidaknya terdiri dari 8 karakter')
    .required('Password dibutuhkan'),
});

class Login extends React.Component {
  doLogin = async (data) => {
    await this.props.loginAction(data);
    const {message, isError} = this.props.auth;
    if (isError === false) {
      Alert.alert(message);
    } else {
      Alert.alert(message);
    }
  };

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Header style={styles.header} transparent>
              <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
              <Text>bahasa indonesia</Text>
            </Header>
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Inspict</Text>
            <TouchableOpacity style={styles.facebooWrap}>
              <Image source={logoFb} style={styles.facebook} />
              <Text style={styles.fbnext}>Lanjutkan dengan Facebook</Text>
            </TouchableOpacity>
            <Text note style={styles.atau}>
              ATAU
            </Text>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={schemaValidation}
              onSubmit={(values) => this.doLogin(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
              }) => (
                <View>
                  <Form style={styles.formWrap}>
                    <Item floatingLabel>
                      <Label>Email</Label>
                      <Input
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        keyboardType="email-address"
                      />
                    </Item>
                    {touched.email && errors.email && (
                      <Text style={styles.textError}>{errors.email}</Text>
                    )}
                    <Item floatingLabel>
                      <Label>Password</Label>
                      <Input
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                      />
                    </Item>
                    {touched.password && errors.password && (
                      <Text style={styles.textError}>{errors.password}</Text>
                    )}
                  </Form>
                  <TouchableOpacity>
                    <Text style={styles.forgot}>Lupa Kata Sandi??</Text>
                  </TouchableOpacity>
                  <Button style={styles.btnLogin} block onPress={handleSubmit}>
                    <Text style={styles.btntext}>LOGIN</Text>
                  </Button>
                  <View style={styles.SignUp}>
                    <Text>Tidak Punya Akun? </Text>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('SignIn')}>
                      <Text style={styles.daftarTxt}>Buat Akun</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  loginAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  facebooWrap: {
    backgroundColor: '#0095F6',
    color: '#fff',
    width: 250,
    height: 40,
    borderRadius: 5,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fbnext: {
    color: '#fff',
    marginLeft: 10,
  },
  atau: {
    marginTop: 15,
    fontSize: 18,
  },
  formWrap: {
    width: 320,
    height: 100,
    marginBottom: 50,
    marginRight: 20,
  },
  textError: {
    fontSize: 10,
    color: '#ad000c',
    marginLeft: 15,
    fontStyle: 'italic',
  },
  forgot: {
    marginLeft: 200,
  },
  btnLogin: {
    marginTop: 25,
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    height: 40,
    borderRadius: 5,
  },
  daftarTxt: {
    color: '#001aff',
  },
  facebook: {
    width: 20,
    height: 20,
  },
  SignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
