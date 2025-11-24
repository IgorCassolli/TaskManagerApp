import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
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
import { useTasks } from "../../contexts/TaskContext";

export default function NewTask() {
    const router = useRouter();
    const { createTask } = useTasks();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!title.trim()) {
            Alert.alert("Attention", "Task title is required!");
            return;
        }

        try {
            setLoading(true);
            await createTask({
                title,
                description,
                completed: false,
            });
            router.back();
        } catch (error) {
            Alert.alert("Error", "Could not create task.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={{ marginLeft: 20, marginTop: 10, width: 40 }}
                    >
                        <Feather name="arrow-left" size={28} color="#fff" />
                    </TouchableOpacity>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        style={{ flex: 1 }}
                    >
                        <ScrollView
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                            keyboardShouldPersistTaps="handled"
                        >
                            <View
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.95)",
                                    margin: 20,
                                    borderRadius: 20,
                                    padding: 24,
                                    shadowColor: "#000",
                                    shadowOpacity: 0.2,
                                    shadowRadius: 10,
                                    elevation: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 24,
                                        fontWeight: "700",
                                        color: "#1e1e1e",
                                        marginBottom: 20,
                                        textAlign: "center"
                                    }}
                                >
                                    New Task
                                </Text>

                                <Text style={{ fontWeight: "600", color: "#374151", marginBottom: 6 }}>Title</Text>
                                <TextInput
                                    placeholder="Add title"
                                    placeholderTextColor="#9ca3af"
                                    value={title}
                                    onChangeText={setTitle}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: "#d1d5db",
                                        borderRadius: 10,
                                        padding: 14,
                                        fontSize: 16,
                                        backgroundColor: "#fff",
                                        marginBottom: 16,
                                    }}
                                />

                                <Text style={{ fontWeight: "600", color: "#374151", marginBottom: 6 }}>Description</Text>
                                <TextInput
                                    placeholder="Add details"
                                    placeholderTextColor="#9ca3af"
                                    value={description}
                                    onChangeText={setDescription}
                                    multiline
                                    style={{
                                        borderWidth: 1,
                                        borderColor: "#d1d5db",
                                        borderRadius: 10,
                                        padding: 14,
                                        fontSize: 16,
                                        height: 120,
                                        textAlignVertical: "top",
                                        backgroundColor: "#fff",
                                    }}
                                />

                                <TouchableOpacity
                                    onPress={handleCreate}
                                    disabled={loading}
                                    style={{
                                        backgroundColor: loading ? "#a5b4fc" : "#4f46e5",
                                        marginTop: 28,
                                        paddingVertical: 16,
                                        borderRadius: 10,
                                        alignItems: "center",
                                        shadowColor: "#4f46e5",
                                        shadowOpacity: 0.3,
                                        elevation: 5,
                                    }}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text
                                            style={{
                                                color: "#fff",
                                                fontWeight: "700",
                                                fontSize: 16,
                                                textTransform: "uppercase",
                                            }}
                                        >
                                            Save Task
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
}