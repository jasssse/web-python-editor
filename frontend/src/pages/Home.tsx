import React, { useState } from 'react'
import axios from 'axios'
import CodeEditor from '../components/CodeEditor'

export default function Home() {
    const [code, setCode] = useState<string>('')
    const [output, setOutput] = useState<string>('')


    const handleSubmit = async () => {
        try {
          const response = await axios.post('/api/submit_code', { code })
          setOutput(response.data.output)
        } catch (error) {
          setOutput('Error submitting code')
        }
      }

    return (
        <div className='flex flex-row p-4 w-full border'>
            <div className='flex flex-col p-4'>
                <h1 className='text-2xl font-bold mb-4'>Python Code Executor</h1>
                <CodeEditor code={code} setCode={setCode} />
                <div className="mt-4">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className='flex flex-col p-4'>
                <h1 className='text-2xl font-bold mb-4'>Output</h1>
                <pre className="mt-4 p-2 bg-gray-100">{output}</pre>
            </div>
            
        </div>

    )
}