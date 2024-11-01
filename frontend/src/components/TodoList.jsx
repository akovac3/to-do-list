import { BASE_URL } from "../App";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";

const Todo = {
    _id: Number,
    body: String,
    completed: Boolean
}

const TodoList = () => {
    const { data: todos, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            try {
                const res = await fetch(BASE_URL + "/todos")
                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong!")
                }
                return data || []
            } catch (error) {
                console.log(error)
            }
        }
    })
    return (
        <div className="w-[40%]">
            <p className="text-heading-h3 bg-gradient-to-r from-blue-800 via-blue-500 to-cyan-300 text-transparent bg-clip-text uppercase font-bold text-center mb-32">
                Today's Tasks
            </p>
            { isLoading && (
                <div className="justify-center my-8">
                    Loading ...
                </div>
            ) }
            { !isLoading && todos?.length === 0 && (
                <div className="flex flex-col items-center gap-12" >
                    <p className="text-body-l text-center text-neutral-700">
                        All tasks completed!
                    </p>
                    <img className="bg-transparent" src='/todo-icon.png' alt='To do logo' width={ 70 } height={ 70 } />
                </div>
            ) }
            <div className="flex flex-col gap-12">
                { todos?.map((todo) => (<TodoItem key={ todo._id } todo={ todo } />
                )) }
            </div>
        </div>
    );
};
export { TodoList, Todo };