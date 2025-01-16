import React, { useState } from 'react';
import { FaArrowUp } from "react-icons/fa";

function App() {
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState<{ [key: string]: number } | null>(null);
    const [selectedModel, setSelectedModel] = useState('DepBERT');
    // const [modelFromBackend, setModelFromBackend] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedModel(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/predict`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText, model: selectedModel }), 
            });

            if (!response.ok) throw new Error('Prediction failed');

            const data = await response.json();
            setPrediction(data.prediction);
            // setModelFromBackend(data.model);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="w-screen h-screen bg-neutral-600 fixed top-0 left-0">
            <div className="bg-white justify-between flex py-4 px-4">
                <button className="bg-black text-white p-2 rounded-lg">Depression Text Analysis</button>
                <button className="bg-black text-white p-2 rounded-lg">About us</button>
            </div>
            <div className="mt-4 text-center text-white">
                <div className='flex flex-row justify-start ml-5'>
                    <p className='mt-2'>Select Model</p>
                    <select
                        className="bg-gray-200 text-black p-2 rounded-md ml-5"
                        value={selectedModel}
                        onChange={handleModelChange}
                    >
                        <option value="DepBERT">DepBERT</option>
                        <option value="DepRoBERTa">DepRoBERTa</option>
                    </select>
                </div>
            </div>
            <div className="fixed bottom-8 left-[50%] -translate-x-1/2">
                <input
                    className="bg-white py-2 px-4 rounded-md outline-none min-w-[800px]"
                    placeholder="input here..."
                    value={inputText}
                    onChange={handleInputChange}
                />
                <button
                    className="bg-black absolute right-2 top-1 text-white rounded-full p-2"
                    onClick={handleSubmit}
                >
                    <FaArrowUp />
                </button>
            </div>
            <div className="mt-4 text-center text-white">
                {prediction && (
                    <div>
                        <p>Model selected in frontend: {selectedModel}</p>  
                        {/* <p>Model used by backend: {modelFromBackend}</p>   */}
                        <p>Text: {inputText}</p>
                        <p>Normal: {(prediction['normal'] * 100).toFixed(2)}%</p>
                        <p>Depressed: {(prediction['depressed'] * 100).toFixed(2)}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
