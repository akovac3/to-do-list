import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const App = () => {

    return (
        <div className="flex w-[60%] rounded-12 px-10 py-8 bg-neutral-300">
            <FontAwesomeIcon className="flex h-20 text-blue-800 pr-12" icon={ faCalendarCheck } />
            <p className="flex-1 font-bold text-heading-h1 text-neutral-700 font-body"> Todo App</p>
            <p className="flex text-blue-500 items-center text-heading-h5">Daily Tasks</p>
        </div>
    )
}

export default App
