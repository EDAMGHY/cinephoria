// /app/(signup-steps)/register-step3.tsx
import React, { useState, useRef } from "react";
import { View, TextInput } from "react-native";
import { useSignUp } from "~/context";
import { Button, Text, Input } from "~/components/ui";
import { useRouter } from "expo-router";
import { Introduction, TopHeader } from "~/components/widgets";

export default function RegisterStep3Screen() {
  const router = useRouter();
  const { next, back, state, updateField } = useSignUp();

  // local codes state
  const [codes, setCodes] = useState(["", "", "", ""]);

  // create 4 refs
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleChange = (text: string, idx: number) => {
    // only digits
    if (text && /\D/.test(text)) return;

    const newCodes = [...codes];
    newCodes[idx] = text;
    setCodes(newCodes);
    updateField("pinCode", newCodes.join(""));

    if (text.length === 1) {
      // move to next field
      if (idx < inputRefs.length - 1) {
        inputRefs[idx + 1].current?.focus();
      }
    } else if (text.length === 0) {
      // moved back (user deleted)
      if (idx > 0) {
        inputRefs[idx - 1].current?.focus();
      }
    }
  };

  const handleVerify = () => {
    // you might validate length here
    next();
    router.push("/(signup-steps)/register-step4");
  };
  const isAllFilled = codes.filter((item) => item != "").length;
  return (
    <View className="flex-1 bg-white dark:bg-custom-black justify-around p-4">
      <TopHeader
        onBack={() => {
          back();
        }}
      />

      <View className="w-full flex-col gap-16">
        <Introduction
          title="Account Verification"
          description="Please enter the code we sent you via email."
        >
          {state.email && (
            <Text className="text-center text-base text-secondary">
              {state.email}
            </Text>
          )}
        </Introduction>

        <View className="w-full flex-col gap-4">
          {/* PIN inputs with refs */}
          <View className="flex-row justify-between px-4">
            {codes.map((code, idx) => (
              <Input
                key={idx}
                ref={inputRefs[idx]}
                value={code}
                onChangeText={(t) => handleChange(t, idx)}
                keyboardType="numeric"
                maxLength={1}
                className="w-1/5 text-center"
              />
            ))}
          </View>
          <Button
            size="custom"
            variant={"link"}
            className="self-end"
            onPress={() => alert("Resend code")}
          >
            <Text className="text-secondary">Resend Code</Text>
          </Button>

          <Button
            variant={isAllFilled < 4 ? "gray" : "default"}
            disabled={isAllFilled < 4}
            onPress={handleVerify}
          >
            <Text className="text-white">Verify</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
