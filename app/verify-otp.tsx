// /app/verify-otp.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "~/context/AuthContext";

export default function VerifyOtpScreen() {
  //   const { verifyOtp } = useAuth();           // you need to implement this in AuthContext
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onVerify = async () => {
    try {
      //   await verifyOtp(code);
      // once context has user, RootLayout Navigator will reroute to /(tabs)
    } catch (e: any) {
      setError(e.message || "Invalid code, please try again");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter the 6-digit code:</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="123456"
        keyboardType="number-pad"
        style={styles.input}
        maxLength={6}
      />
      <Button title="Verify OTP" onPress={onVerify} />
      <View style={styles.resend}>
        <Text>Didn't receive it?</Text>
        <Text
          style={styles.resendLink}
          onPress={() => {
            // you might call your API to resend the OTP
          }}
        >
          Resend code
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingVertical: 8,
    fontSize: 18,
    letterSpacing: 8, // space out digits
    textAlign: "center",
  },
  resend: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  resendLink: {
    marginLeft: 4,
    textDecorationLine: "underline",
  },
});
