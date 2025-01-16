import React, { useState } from 'react';
import { FaArrowUp } from "react-icons/fa";
function App() {
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState<{ [key: string]: number } | null>(null);
    const [shapvalue, setShapvalue] = useState([]);
    const [tokens, setTokens] = useState([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText }),
            });

            if (!response.ok) throw new Error('Prediction failed');

            const data = await response.json();
            setPrediction(data.prediction);
            setShapvalue(data.shap);
            setTokens(data.tokens);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className=" min-h-screen bg-white top-0 left-0">
            <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center">
                <p className="text-5xl font-lmroman my-6 ">Depression Text Analysis</p>
                <div className="flex bg-gray-100 items-center py-2 px-4 rounded-full min-w-[800px] min-h-16">

                    <input
                        className="min-w-[800px] outline-none bg-gray-100 font-lmroman"
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
                <div className="mt-4 text-center text-black">
                    {prediction && (
                        <div>
                            <p>Text: {inputText}</p>
                            <p>Non-toxic: {prediction.Normal}</p>
                            <p>Toxic: {prediction.Depressed}</p>
                        </div>
                    )}
                </div>
                <div className="text-black">
                    {shapvalue && (
                        <div>
                            <p>{shapvalue}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
