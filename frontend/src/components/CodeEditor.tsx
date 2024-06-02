import React, { useState } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/themes/prism.css';

type CodeEditorProps = {
    code: string,
    setCode: (code: string) => void
}


export default function CodeEditor({ code, setCode }: CodeEditorProps) {
    return (
        <Editor
            value={code}
            className='outline'
            onValueChange={setCode}
            highlight={code => highlight(code, languages.python, 'python')}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
        />
    )
}

