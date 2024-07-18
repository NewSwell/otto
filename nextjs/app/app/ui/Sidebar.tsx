import classNames from "classnames"
import { XMarkIcon } from "@heroicons/react/24/solid"
import Preferences from "./Preferences"

export default function Sidebar({isOpen, setIsOpen}){

    return <div className={classNames({
		"absolute right-0 top-[60px] bottom-0 bg-gray-50 transition-all overflow-hidden z-10": true,
		'w-64': isOpen,
		'w-0': !isOpen,
	})}
    >
        <button onClick={() => setIsOpen(false)}>
            <XMarkIcon className="w-6 h-6 text-black" />
        </button>
        <Preferences />
    </div>
}