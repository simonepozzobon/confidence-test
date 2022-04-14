import React from "react";
import { ArrowDownIcon } from "@heroicons/react/outline";

export default function ScrollDownMessage() {
    return (
        <div className="flex justify-center items-center pb-24">
            <ArrowDownIcon className="w-4 text-white animate-bounce" />
        </div>
    );
}
