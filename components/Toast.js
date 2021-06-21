import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationCircle,
  faCheck,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Toast() {
  return (
    <div
      className="hover:scale-105 transition-all bg-grey-lightest border-l-4 border-green-500 p-4 py-4 rounded shadow-lg flex items-center justify-between mb-6 bottom-3 left-1/2 -translate-x-1/2 transform absolute"
      role="alert"
    >
      <span className="flex items-center mx-auto mr-5">
        <FontAwesomeIcon className="text-green-500" size="2x" icon={faCheck} />
      </span>
      <div className="sm:text-left text-center sm:mb-0 mb-3 w-128 mr-5">
        <p className="font-bold mb-1 text-lg">You shall not pass.</p>
        <p className="text-grey-dark inline-block">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut.
        </p>
      </div>
      <FontAwesomeIcon
        className="mx-auto my-auto flex-no-shrink fill-current text-center text-gray-600 cursor-pointer"
        size="lg"
        icon={faTimes}
      />
    </div>
  );
}
