import { useState, useEffect } from "react";
import axios from 'axios';

type CodeSnippet = {
    id: number;
    code: string;
    output: string;
};

type CodeListProps = {
    codes: CodeSnippet[];
    setCode: (code: string) => void;
}

export default function CodeList({ codes, setCode }: CodeListProps) {

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Previous Code Snippets</h2>
            <ul className="list-disc pl-5">
                {codes.map((codeSnippet) => (
                    <li key={codeSnippet.id} className="mb-2">
                        <button
                            className="text-blue-500 underline"
                            onClick={() => setCode(codeSnippet.code)}
                        >
                            {codeSnippet.code}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}