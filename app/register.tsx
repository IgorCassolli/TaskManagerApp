import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterScreen() {
    const router = useRouter();
    const { register } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError("");
        setLoading(true);

        try {
            await register(email, password);
            Alert.alert(
                "Success",
                "Your account has been created. Please sign in.",
                [{ text: "OK", onPress: () => router.replace("/login") }]
            );
        } catch (err: any) {
            const errorMessage = err.response?.data || err.message || "Registration failed.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={["#4f46e5", "#7c3aed"]}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ width: "100%", alignItems: "center" }}
                >
                    <View
                        style={{
                            width: "85%",
                            backgroundColor: "rgba(255,255,255,0.95)",
                            borderRadius: 20,
                            paddingVertical: 40,
                            paddingHorizontal: 24,
                            shadowColor: "#000",
                            shadowOpacity: 0.2,
                            shadowRadius: 10,
                            elevation: 10,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 28,
                                fontWeight: "800",
                                textAlign: "center",
                                color: "#1e1e1e",
                                marginBottom: 8,
                            }}
                        >
                            Create Account
                        </Text>

                        <Text style={{ textAlign: "center", color: "#6b7280", fontSize: 15, marginBottom: 28 }}>
                            Get started by creating your account.
                        </Text>

                        {error ? (
                            <View style={{ backgroundColor: "#fee2e2", borderRadius: 8, padding: 12, marginBottom: 16 }}>
                                <Text style={{ color: "#991b1b", textAlign: "center" }}>{error}</Text>
                            </View>
                        ) : null}

                        <Text style={{ fontWeight: "600", color: "#374151", marginBottom: 8 }}>Email</Text>
                        <TextInput
                            style={{
                                backgroundColor: "#f3f4f6",
                                borderRadius: 12,
                                padding: 16,
                                marginBottom: 16,
                                fontSize: 16,
                                borderWidth: 1,
                                borderColor: "#e5e7eb"
                            }}
                            placeholder="you@example.com"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            value={email}
                            onChangeText={setEmail}
                        />

                        <Text style={{ fontWeight: "600", color: "#374151", marginBottom: 8 }}>Password</Text>
                        <TextInput
                            style={{
                                backgroundColor: "#f3f4f6",
                                borderRadius: 12,
                                padding: 16,
                                marginBottom: 24,
                                fontSize: 16,
                                borderWidth: 1,
                                borderColor: "#e5e7eb"
                            }}
                            placeholder="••••••••"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity
                            onPress={handleRegister}
                            disabled={loading}
                            style={{
                                backgroundColor: "#4f46e5",
                                paddingVertical: 16,
                                borderRadius: 12,
                                alignItems: "center",
                                marginBottom: 16,
                                shadowColor: "#4f46e5",
                                shadowOpacity: 0.4,
                                elevation: 5,
                            }}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Sign Up</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.replace("/login")}
                            disabled={loading}
                            style={{ alignItems: "center", padding: 10 }}
                        >
                            <Text style={{ color: "#6b7280", fontSize: 15 }}>
                                Already have an account? <Text style={{ color: "#4f46e5", fontWeight: "700" }}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}