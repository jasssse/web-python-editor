import { useState, useEffect } from 'react'
import axios from 'axios'
import CodeEditor from '../components/CodeEditor'
import CodeList from '../components/CodeList'

export default function Home() {
    const [codeList, setCodeList] = useState<any[]>([])
    const [code, setCode] = useState<string>('')
    const [output, setOutput] = useState<string>('')
    const [status, setStatus] = useState<string>('success')
    const base = 'http://localhost:8000'

    const handleTest = async () => {
        if (code == "") {
            setOutput("Code cannot be empty")
            setStatus("error")
            return
        }
        try {
            const response = await axios.post(base + '/api/test_code', { code })
            setOutput(response.data.output)
            setStatus(response.data.status)
            fetchCodes()
        } catch (error) {
            setStatus("error")
            setOutput('Error submitting code')
        }
    }

    const handleSubmit = async () => {
        if (code == "") {
            setOutput("Code cannot be empty")
            setStatus("error")
            return
        }
        try {
            const response = await axios.post(base + '/api/submit_code', { code })
            setOutput(response.data.output)
            setStatus(response.data.status)
            fetchCodes()
        } catch (error) {
            setStatus("error")
            setOutput('Error submitting code')
        }
    }
    
    const fetchCodes = async () => {
        try {
            const response = await axios.get(base + '/api/codes');
            setCodeList(response.data);
        } catch (error) {
            console.error('Error fetching codes', error);
        }
    };
    
    useEffect(() => {
        fetchCodes();
    }, []);

    return (
        <div className='flex flex-row p-4 w-screen h-screen'>
            <div className='flex flex-col p-4 w-9/12'>
                <div className='flex flex-row pt-4 justify-between'>
                    <h1 className='text-2xl font-bold mb-4'>Python Code Executor</h1>
                    <div>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleTest}>Test</button>
                        <button className="bg-sky-400 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded ml-2" onClick={handleSubmit}>Submit</button>
                    </div>
                   
                </div>
                <CodeEditor code={code} setCode={setCode} />
                <div className='flex flex-col h-1/3'>
                    <h1 className='text-2xl font-bold pt-4'>Output</h1>
                    <pre className= {"mt-4 p-4 border rounded-md h-full text-sm" + (status == 'error' ? 'border-red-500 text-red-500' : 'border-slate-500')}>{output}</pre>
                </div>
                
            </div>
            <div className='w-4/12'>
                <CodeList codes={codeList} setCode={setCode} />
            </div>
            
        </div>

    )
}