import React, { useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/navigation/Navigation";
import { useAuth } from "@/app/context/AuthContext";
import { ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Image, View, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import styles from "./Login.style";
import logo from "../../../assets/images/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      await login(username, password);
      navigation.navigate("home");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://iili.io/3IoPfjI.jpg" }}
      style={styles.backgroundImage}
    >

      {/* Left for testing */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.testButton}
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "home",
                    params: {
                      screen: "Cafes",
                    },
                  },
                ],
              })
            );
          }}
        >
          <Image
            style={styles.testButton}
            source={require("@/app/assets/images/navigation.png")}
          />
        </TouchableOpacity>
        {/* Left for testing */}

      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.loginContainer}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>
              <Text style={styles.highlight}>Welcome to </Text>Cafe-Dash
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              mode="outlined"
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              loading={loading}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            <Button
              mode="contained"
              onPress={() => navigation.navigate("register")}
              style={styles.registerButton}
              labelStyle={styles.registerButtonLabel}
            >
              Sign Up
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("forgotpassword")}>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Login;
