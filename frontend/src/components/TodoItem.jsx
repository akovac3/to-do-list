import { faCheckCircle, faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../App";

const TodoItem = ({ todo }) => {
    const queryClient = useQueryClient()
    const { mutate: updateTodo, isPending: isUpdating } = useMutation({
        mutationKey: ["updateTodo"],
        mutationFn: async () => {
            if (todo.completed) return alert("Todo is already completed")
            try {
                const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
                    method: "PATCH",
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                return data
            } catch (error) {
                console.log(error)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
        onError: (error) => {
            alert(error.message)
        }
    })

    const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
        mutationKey: ["deleteTodo"],
        mutationFn: async () => {
            try {
                const res = await fetch(BASE_URL + `/todos/${todo._id}`, {
                    method: "DELETE",
                })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong")
                }
                return data
            } catch (error) {
                console.log(error)
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        }
    })
    return (
        <div className="w-full flex gap-2 items-center">
            <div className="w-full flex items-center border border-neutral-500 p-4 mr-12 rounded-8">
                <p className={ `flex-1 ${todo.completed ? "text-green-200 line-through" : "text-yellow-200"}` }
                >
                    { todo.body }
                </p>
                { todo.completed && (
                    <p className="mx-1 text-green-200 bg-green-200/40 px-4 rounded-8">
                        Done
                    </p>
                ) }
                { !todo.completed && (
                    <p className="mx-1 text-yellow-200 bg-yellow-200/40 px-4 rounded-8">
                        In Progress
                    </p>
                ) }
            </div>
            <div className="flex gap-12 items-center">
                <div className="text-green-600 cursor-pointer" onClick={ updateTodo }>
                    { !isUpdating && <FontAwesomeIcon icon={ faCheckCircle } className="h-[20px]" /> }
                    { isUpdating && <FontAwesomeIcon icon={ faSpinner } className="h-[20px]" /> }
                </div>
                <div className="text-red-600 cursor-pointer" onClick={ deleteTodo }>
                    { !isDeleting && <FontAwesomeIcon icon={ faTrash } className="h-[20px]" /> }
                    { isDeleting && <FontAwesomeIcon icon={ faSpinner } className="h-[20px]" /> }
                </div>
            </div>
        </div>
    );
};
export default TodoItem;