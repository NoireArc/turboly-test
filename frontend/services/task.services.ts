import { api } from './api';

export const getTasks = async (
    sort: string,
) => {
    const response = await api.get(
        `/tasks?sort=${sort}`,
    );

    return response.data;
};

export const createTask = async (
    body: {
        title: string;
        description: string;
        due_date: string;
        priority: string;
    },
) => {
    const response = await api.post(
        '/tasks',
        body,
    );

    return response.data;
};

export const toggleTask = async (
    id: number,
) => {
    const response = await api.patch(
        `/tasks/${id}`,
    );

    return response.data;
};

export const deleteTask = async (
    id: number,
) => {
    const response = await api.delete(
        `/tasks/${id}`,
    );

    return response.data;
};