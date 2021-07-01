import { readState } from "../operations/query";
import { useQuery } from "@apollo/client";

export default function Spinner() {
  const {
    data: {
      readState: { showSpinner },
    },
  } = useQuery(readState("showSpinner"));

  if (!showSpinner) {
    return null;
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center backdrop-filter backdrop-blur-sm fixed z-50">
      <div className="loader bg-white p-5 rounded-full flex space-x-3 border-2 border-gray-400">
        <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
        <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce200"></div>
        <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce400"></div>
      </div>
    </div>
  );
}
