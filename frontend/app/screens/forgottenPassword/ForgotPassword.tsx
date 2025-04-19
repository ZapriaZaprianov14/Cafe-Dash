import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
} from "react-native";
import { TextInput, Button, Text } from 'react-native-paper';
import styles from "./ForgotPassword.style";
import CommonHeader from "@/app/components/headers/commonHeader/CommonHeader";
import customAPI from "@/app/services/apiClient";
import { useNavigation } from "expo-router";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/commonjs/src/types";
import { RootStackParamList } from "@/app/navigation/Navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePasswordReset = async (): Promise<void> => {
    if (!email.trim()) {
      setMessage("Please provide email");
      return;
    }
    try {
      await customAPI.post(`/api/password/resetToken/${email}`, );
    } catch (error: any) {
    } finally {
      setMessage("If an account with that email exists, you will receive a password reset link.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <CommonHeader title="Forgotten Password" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Forgot Your Password?</Text>
          <Text>Enter your email</Text>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Button mode="contained" style={styles.button} onPress={handlePasswordReset} >
            Send Reset Link
          </Button>
          <View style={{ marginVertical: 10 }} />
          <Button mode="outlined" style={styles.secondaryButton} onPress={() => navigation.navigate("resetpassword")}>
            Enter Reset Token
          </Button>
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
