import React, { useState, useRef } from 'react';
import { FaArrowUp } from "react-icons/fa";
import TypeWriterComponent from './TypeWriter'
import ResCard from './ResCard';


function App() {
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState<{ [key: string]: number } | null>(null);
    const [shapvalue, setShapvalue] = useState([]);
    const [tokens, setTokens] = useState([]);
    const [selectedModel, setSelectedModel] = useState('DepBERT');
    // const [modelFromBackend, setModelFromBackend] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

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
            setShapvalue(data.shap);
            setTokens(data.tokens);
            // setModelFromBackend(data.model);

            scrollRef.current?.scrollIntoView({ behavior: "smooth"});
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <div className=" min-h-screen bg-gradient-to-b from-[#FCFAEE]  top-0 left-0">
                <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center">
                    <div className='flex items-center'>
                        <TypeWriterComponent />
                        <span className='text-5xl font-Latin-Modern my-6 ml-3'>
                            Text Analysis
                        </span>
                    </div>
                    <div className='font-Latin-Modern text-gray-400'>english only</div>
                    <div className="mt-4 text-center text-white">
                        <div className='flex flex-row justify-start ml-5 mb-6'>
                            <p className='mt-2 font-Latin-Modern italic text-black'>Select Model</p>
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
                    <div className="flex bg-gray-100 items-center py-2 px-4 rounded-full min-w-[800px] min-h-16 drop-shadow-lg">

                        <input
                            className="min-w-[800px] outline-none bg-gray-100 font-IBM-Plex-Mono"
                            placeholder="input here..."
                            value={inputText}
                            onChange={handleInputChange}
                        />
                        <button
                            className="bg-black top-1 text-white rounded-full p-2"
                            onClick={handleSubmit}
                        >
                            <FaArrowUp />
                        </button>
                    </div>
                </div>
            </div>
                <ResCard 
                    scrollRef={scrollRef} 
                    prediction={prediction} 
                    inputText={inputText} 
                    shapvalue={shapvalue}
                    tokens={tokens}
                    />
        </div>
    );
}

export default App;

