import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Task, useTasks } from "../contexts/TaskContext";

interface TaskItemProps {
    task: Task;
    onPress?: () => void;
}

export default function TaskItem({ task, onPress }: TaskItemProps) {
    const { toggleTaskCompletion } = useTasks();

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 2,
                borderWidth: 1,
                borderColor: "#f3f4f6"
            }}
        >
            <TouchableOpacity
                onPress={() => toggleTaskCompletion(task.id)}
                style={{ marginRight: 14, padding: 4 }}
            >
                <Ionicons
                    name={task.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={26}
                    color={task.completed ? "#4f46e5" : "#d1d5db"}
                />
            </TouchableOpacity>

            <View style={{ flex: 1, marginRight: 8 }}>
                <Text
                    numberOfLines={1}
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        textDecorationLine: task.completed ? "line-through" : "none",
                        color: task.completed ? "#9ca3af" : "#1f2937",
                        marginBottom: 4,
                    }}
                >
                    {task.title}
                </Text>

                {task.description ? (
                    <Text
                        numberOfLines={2}
                        style={{
                            color: "#6b7280",
                            fontSize: 14,
                            lineHeight: 20,
                        }}
                    >
                        {task.description}
                    </Text>
                ) : null}
            </View>
        </TouchableOpacity>
    );
}