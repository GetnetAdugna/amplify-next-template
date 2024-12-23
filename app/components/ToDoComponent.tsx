'use client'

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { signOut } from "aws-amplify/auth";

Amplify.configure(outputs);

const client = generateClient<Schema>();

const ToDoComponent = () => {
    const router = useRouter();
    const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

    const { user } = useAuthenticator((context) => [context.user]);

    function listTodos() {
        client.models.Todo.observeQuery().subscribe({
            next: (data) => setTodos([...data.items]),
        });
    }

    function deleteTodo(id: string) {
        client.models.Todo.delete({ id });
    }

    useEffect(() => {
        listTodos();
    }, []);

    function createTodo() {
        client.models.Todo.create({
            content: window.prompt("Todo content"),
        });
    }

    const handleSignOut = async () => {
        await signOut();
        router.push("/signin")
    };

    return (
        <>
            <h1>My todos</h1>
            <h1>{user && user?.userId}</h1>
            <button onClick={createTodo}>+ new</button>
            <ul>
                {todos.map((todo) => (
                    <li onClick={() => deleteTodo(todo.id)} key={todo.id}>
                        {todo.content}
                    </li>
                ))}
            </ul>
            <div>
                🥳 App successfully hosted. Try creating a new todo.
                <br />
                <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
                    Review next steps of this tutorial.
                </a>
            </div>
            <button onClick={handleSignOut}>Sign out</button>
        </>
    );
};

export default ToDoComponent;
