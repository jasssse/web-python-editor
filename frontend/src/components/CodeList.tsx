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
        <div className="h-full pt-8 pl-2">
            <h2 className="text-2xl font-bold pb-4">Previous Code Snippets</h2>
            <ul className="list-disc pr-2 overflow-auto">
                {codes.map((codeSnippet) => (
                    <ul key={codeSnippet.id} className="mb-2">
                        <button
                            className="text-blue-500 underline w-full"
                            onClick={() => setCode(codeSnippet.code)}
                        >
                            {codeSnippet.code}
                        </button>
                    </ul>
                ))}
            </ul>
        </div>
    );
}