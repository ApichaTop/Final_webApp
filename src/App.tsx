import React, { useState } from 'react';
import { FaArrowUp } from "react-icons/fa";
function App() {
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState<{ [key: string]: number } | null>(null);

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
                        <p>Text: {inputText}</p>
                        <p>Non-toxic: {prediction['non-toxic']}</p>
                        <p>Toxic: {prediction['toxic']}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;