import { Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "../contexts/AuthContext";
import { TaskProvider } from "../contexts/TaskContext";

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <TaskProvider>
                    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
                        <Stack
                            screenOptions={{
                                headerShown: false,
                                contentStyle: { backgroundColor: "#f9fafb" }
                            }}
                        />
                    </View>
                </TaskProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}