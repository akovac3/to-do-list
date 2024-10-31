import { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App";

const TodoForm = () => {
    const [newTodo, setNewTodo] = useState("");
    const queryClient = useQueryClient()

    const { mutate: createTodo, isPending: isCreating } = useMutation({
        mutationKey: ['createTodo'],
        mutationFn: async (e) => {
            e.preventDefault()
            try {
                const res = await fetch(BASE_URL + "/todos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ body: newTodo })
                })
                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }

                setNewTodo("")
                return data
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
        onError: (error) => {
            alert(error.message)
        }
    })

    return (
        <div className="flex py-32 w-[40%] gap-2">
            <form onSubmit={ createTodo } className="w-full">
                <div className="flex h-32">
                    <input
                        className="flex-1 text-neutral-700 p-8 focus:border focus:border-neutral-400 bg-neutral-200 rounded-8 outline-none"
                        type='text'
                        value={ newTodo }
                        onChange={ (e) => setNewTodo(e.target.value) }
                        ref={ (input) => input && input.focus() }
                    />
                    <button
                        className="ml-8 rounded-8 w-48 text-neutral-400 bg-neutral-700"
                        type='submit'
                    >
                        { isCreating ? <span /> : <FontAwesomeIcon icon={ faPlus } /> }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;