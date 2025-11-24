import { Feather, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Task, useTasks } from "../../contexts/TaskContext";

export default function TaskDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { getTask, updateTask, deleteTask } = useTasks();

    const [task, setTask] = useState<Task | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Carrega a tarefa ao iniciar a tela
    useEffect(() => {
        const fetchTask = async () => {
            if (typeof id === "string") {
                const fetchedTask = await getTask(parseInt(id, 10));
                if (fetchedTask) {
                    setTask(fetchedTask);
                    setTitle(fetchedTask.title);
                    setDescription(fetchedTask.description);
                }
            }
            setLoading(false);
        };
        fetchTask();
    }, [id]);

    const handleSave = async () => {
        if (!task || !title.trim()) {
            Alert.alert("Attention", "Title cannot be empty.");
            return;
        }
        setIsSaving(true);
        try {
            await updateTask(task.id, {
                title,
                description,
                completed: task.completed // Mantém o status de completude
            });
            Alert.alert("Success", "Task updated successfully!");
            router.back();
        } catch (e) {
            Alert.alert("Error", "Could not save changes.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = () => {
        if (!task) return;

        Alert.alert(
            "Confirm Deletion",
            `Are you sure you want to delete "${task.title}"?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        setIsSaving(true);
                        try {
                            await deleteTask(task.id);
                            router.replace("/tasks");
                        } catch (e) {
                            Alert.alert("Error", "Could not delete task.");
                        } finally {
                            setIsSaving(false);
                        }
                    }
                },
            ]
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        );
    }

    if (!task) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Task not found.</Text>
                <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 20 }}>
                    <Text style={{ color: '#4f46e5', fontSize: 16 }}>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <LinearGradient colors={["#4f46e5", "#7c3aed"]} style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    {/* Header Customizado */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Feather name="arrow-left" size={24} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Edit Task</Text>

                        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
                            <Feather name="trash-2" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollView}>
                        <View style={styles.card}>

                            <View style={styles.statusBox}>
                                <Ionicons
                                    name={task.completed ? "checkmark-circle" : "alert-circle"}
                                    size={20}
                                    color={task.completed ? "#22c55e" : "#f59e0b"}
                                    style={{ marginRight: 8 }}
                                />
                                <Text style={styles.statusText}>
                                    Status: {task.completed ? 'Completed' : 'Pending'}
                                </Text>
                            </View>

                            <Text style={styles.label}>Title</Text>
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                style={styles.input}
                            />

                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                style={[styles.input, styles.textArea]}
                            />

                            <TouchableOpacity
                                onPress={handleSave}
                                disabled={isSaving}
                                style={styles.saveButton}
                            >
                                {isSaving ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.saveButtonText}>Save Changes</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
    },
    errorText: {
        fontSize: 18,
        color: "#ef4444",
        fontWeight: "600",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'transparent',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    deleteButton: {
        backgroundColor: '#ef4444',
        borderRadius: 8,
        padding: 8,
    },
    scrollView: {
        flex: 1,
        padding: 20,
    },
    card: {
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: 20,
        padding: 24,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        marginBottom: 40,
    },
    statusBox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f3f4f6',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#374151',
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 10,
        padding: 14,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    textArea: {
        height: 120,
        textAlignVertical: "top",
    },
    saveButton: {
        backgroundColor: "#4f46e5",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30,
        shadowColor: "#4f46e5",
        shadowOpacity: 0.4,
        elevation: 5,
    },
    saveButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        textTransform: 'uppercase',
    }
});