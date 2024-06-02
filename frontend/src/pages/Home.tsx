import React, { useState } from 'react'
import axios from 'axios'
import CodeEditor from '../components/CodeEditor'

export default function Home() {
    const [code, setCode] = useState<string>('')
    const [output, setOutput] = useState<string>('')

    return (
        <div className='container mx-auto p-4'>
            <h1 className='test-2xl font-bold mb-4'>Python Code Executor</h1>
            <CodeEditor code={code} setCode={setCode} />

        </div>

    )
}