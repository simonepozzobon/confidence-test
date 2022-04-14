import React from "react";
import { ExclamationIcon } from "@heroicons/react/outline";

export default function ErrorMessage() {
    return (
        <div className="flex justify-center items-center pb-24 relative">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-red-500 text-white shadow-xl">
                <ExclamationIcon className="w-4 text-white" />
                <span className="ml-2">Error Loading !</span>
            </div>
        </div>
    );
}
