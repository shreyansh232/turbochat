"use client";

import { useState } from "react";
import { useSocket } from "../context/SocketProvider";

export default function Page() {
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState('');
  return (
    <div className="h-screen w-full bg-slate-800 p-20">
      <div className="max-w-[600px] mx-auto border border-black p-10 rounded-xl bg-gray-800 shadow-lg shadow-black text-white">
        <h1 className="mb-5 text-3xl bg-clip-text text-transparent bg-linear-to-r from-amber-500 to-amber-100 text-shadow-neutral-900">
          All messages will appear here
        </h1>
        <div className="border border-amber-400 w-full p-10 mx-auto rounded-xl h-[500px] bg-gray-900 gap-5 flex flex-col">
          <span className="px-3 py-2 bg-slate-800 rounded-xl">
            Your message
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 mt-5">
          <input
            onChange={e => setMessage(e.target.value)}
            type="text"
            placeholder="Message..."
            className="border border-amber-400 rounded-md py-1 px-5 focus:outline-none focus:bg-amber-300 text-black w-full bg-amber-200"
          />
          <button
            onClick={(e) => sendMessage(message)}
            type="submit"
            className="text-black py-1 px-5 rounded-lg bg-amber-400 shadow-md shadow-black transition-transform duration-300 hover:bg-amber-500 border border-black"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
