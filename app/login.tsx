import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        setLoading(true);
        try {
            await login(email, password);
        } catch {
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 20,
                            }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View
                                style={{
                                    width: "100%",
                                    maxWidth: 400,
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
                                        fontSize: 32,
                                        fontWeight: "800",
                                        textAlign: "center",
                                        color: "#1e1e1e",
                                        marginBottom: 8,
                                    }}
                                >
                                    Task Manager
                                </Text>

                                <Text
                                    style={{
                                        textAlign: "center",
                                        color: "#6b7280",
                                        fontSize: 16,
                                        marginBottom: 32,
                                    }}
                                >
                                    Welcome back! 👋
                                </Text>

                                {error ? (
                                    <View style={{ backgroundColor: "#fee2e2", borderRadius: 8, padding: 12, marginBottom: 16 }}>
                                        <Text style={{ color: "#991b1b", textAlign: "center", fontWeight: "500" }}>{error}</Text>
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
                                    onPress={handleLogin}
                                    disabled={loading}
                                    style={{
                                        backgroundColor: "#4f46e5",
                                        paddingVertical: 16,
                                        borderRadius: 12,
                                        alignItems: "center",
                                        marginBottom: 16,
                                        shadowColor: "#4f46e5",
                                        shadowOpacity: 0.4,
                                        shadowOffset: { width: 0, height: 4 },
                                        elevation: 5,
                                    }}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>Sign In</Text>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => router.push("/register")}
                                    disabled={loading}
                                    style={{ alignItems: "center", padding: 10 }}
                                >
                                    <Text style={{ color: "#6b7280", fontSize: 15 }}>
                                        Don&apos;t have an account? <Text style={{ color: "#4f46e5", fontWeight: "700" }}>Sign Up</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}