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
    <div class="h-screen w-screen flex justify-center items-center bg-black opacity-70 absolute">
      <div class="loader bg-white p-5 rounded-full flex space-x-3">
        <div class="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
        <div class="w-5 h-5 bg-gray-800 rounded-full animate-bounce200"></div>
        <div class="w-5 h-5 bg-gray-800 rounded-full animate-bounce400"></div>
      </div>
    </div>
  );
}
