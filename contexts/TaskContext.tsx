import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface TaskContextType {
    tasks: Task[];
    loading: boolean;
    fetchTasks: () => Promise<void>;
    getTask: (id: number) => Promise<Task | null>;
    createTask: (data: Omit<Task, "id">) => Promise<void>;
    updateTask: (id: number, data: Partial<Task>) => Promise<void>;
    deleteTask: (id: number) => Promise<void>;
    toggleTaskCompletion: (id: number) => Promise<void>;
}

const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setTasks([]);
        }
    }, [user]);

    const fetchTasks = async () => {
        if (!user) return;

        try {
            setLoading(true);
            const res = await api.get("/api/tasks");
            setTasks(res.data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
        } finally {
            setLoading(false);
        }
    };

    const getTask = async (id: number): Promise<Task | null> => {
        try {
            setLoading(true);
            const res = await api.get(`/api/tasks/${id}`);
            return res.data;
        } catch (error) {
            console.error("Erro ao buscar tarefa:", error);
            return null;
        } finally {
            setLoading(false);
        }
    };


    const createTask = async (data: Omit<Task, "id">) => {
        try {
            setLoading(true);
            if (!user || !user.id) {
                console.error("Erro: Usuário não está logado ou sem ID.");
                return;
            }

            const payload = {
                ...data,
                userId: user.id
            };
            const res = await api.post("/api/tasks", payload);
            setTasks((prev) => [...prev, res.data]);
        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (id: number, data: Partial<Task>) => {
        try {
            setLoading(true);
            if (!user || !user.id) throw new Error("User not logged in.");

            const payload = { ...data, userId: user.id };

            const res = await api.put(`/api/tasks/${id}`, payload);
            setTasks((prev) =>
                prev.map((task) => (task.id === id ? res.data : task))
            );
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (id: number) => {
        try {
            setLoading(true);
            await api.delete(`/api/tasks/${id}`);
            setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Erro ao excluir tarefa:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const toggleTaskCompletion = async (id: number) => {
        try {
            setLoading(true);
            const task = tasks.find((t) => t.id === id);
            if (!task) return;

            const res = await api.put(`/api/tasks/${id}`, {
                title: task.title,
                description: task.description,
                completed: !task.completed,
                userId: user?.id
            });

            setTasks((prev) =>
                prev.map((t) => (t.id === id ? res.data : t))
            );
        } catch (error) {
            console.error("Erro ao alternar conclusão da tarefa:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                loading,
                fetchTasks,
                getTask,
                createTask,
                updateTask,
                deleteTask,
                toggleTaskCompletion
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
