import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import TaskItem from "../../components/TaskItem";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TaskContext";

export default function TaskList() {
    const { tasks, fetchTasks, loading } = useTasks();
    const { logout } = useAuth();

    const insets = useSafeAreaInsets();

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleLogout = async () => {
        await logout();
        router.replace("/login");
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

            <View style={styles.header}>
                <View>
                    <Text style={styles.greeting}>Task Manager</Text>
                    <Text style={styles.subGreeting}>Your tasks for today</Text>
                </View>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Feather name="log-out" size={20} color="#ef4444" />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TaskItem
                            task={item}
                            onPress={() => router.push(`/tasks/${item.id}`)}
                        />
                    )}
                    contentContainerStyle={[
                        styles.listContent,
                        { paddingBottom: styles.fab.height + insets.bottom + 20 }
                    ]}
                    ListEmptyComponent={
                        <View style={styles.emptyState}>
                            <Feather name="clipboard" size={50} color="#d1d5db" />
                            <Text style={styles.emptyText}>No tasks here.</Text>
                            <Text style={styles.emptySubText}>Tap + to add a new task.</Text>
                        </View>
                    }
                />
            </View>

            <TouchableOpacity
                style={[
                    styles.fab,
                    { bottom: Math.max(30, insets.bottom + 10) }
                ]}
                onPress={() => router.push("/tasks/new")}
                activeOpacity={0.8}
            >
                <Feather name="plus" size={32} color="#fff" />
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9fafb",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9fafb",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    greeting: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1e1e1e",
    },
    subGreeting: {
        fontSize: 14,
        color: "#6b7280",
        marginTop: 2,
    },
    logoutButton: {
        padding: 12,
        backgroundColor: "#fee2e2",
        borderRadius: 12,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
    },
    emptyText: {
        marginTop: 16,
        color: "#374151",
        fontSize: 18,
        fontWeight: "600",
    },
    emptySubText: {
        color: "#9ca3af",
        fontSize: 14,
        marginTop: 4,
    },
    fab: {
        position: "absolute",
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#4f46e5",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        shadowColor: "#4f46e5",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        zIndex: 999,
    }
});