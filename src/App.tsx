import React, { useState } from 'react';
import { FaArrowUp } from "react-icons/fa";
import TypeWriterComponent from './TypeWriter'
import Popup from './Popup';
import Viz from './Viz';
import Emoj from './Emoj';

function App() {
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState<{ [key: string]: number } | null>(null);
    const [shapvalue, setShapvalue] = useState([]);
    const [tokens, setTokens] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState('DepBERT');
    // const [modelFromBackend, setModelFromBackend] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  const togglePopup = () => {
    setPopupVisible(!popupVisible);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText, model: selectedModel }),
      });

      if (!response.ok) throw new Error("Prediction failed");

            const data = await response.json();
            setPrediction(data.prediction);
            setShapvalue(data.shap);
            setTokens(data.tokens);
            // setModelFromBackend(data.model);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className=" min-h-screen bg-white top-0 left-0">
            <div className='mt-4 mr-5 flex flex-row justify-end'>
                <button 
                    className="bg-black top-1 text-white rounded-full p-2"
                    onClick={togglePopup}
                >
                    About Us
                </button>
            </div>
            <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] flex flex-col justify-center items-center">
                <p className="text-5xl font-Latin-Modern my-6 ">Depression Text Analysis</p>
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
                <div className="flex bg-gray-100 items-center py-2 px-4 rounded-full min-w-[800px] min-h-16">

                    <input
                        className="min-w-[800px] outline-none bg-gray-100 font-Latin-Modern"
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
                            <p>Normal: {(prediction.normal*100).toFixed(2)}%</p>
                            <p>Depressed: {(prediction.depressed * 100).toFixed(2)}%</p>
                        </div>
                    )}
                </div>
                <div className="text-black">
                {shapvalue && tokens && (
                    <div className="flex flex-wrap justify-center mt-4">
                        {tokens
                            .filter((word) => word.trim() !== '') 
                            .map((word, index) => {
                                const intensity = Math.min(Math.abs(shapvalue[0][index][0]) * 3, 1); 
                                return (
                                    <div
                                        key={index}
                                        className="m-2 px-3 py-1 rounded-lg border border-gray-300"
                                        style={{
                                            backgroundColor: `rgba(255, 0, 0, ${intensity})`,
                                        }}
                                    >
                                        {word}
                                    </div>
                                );
                            })}
                    </div>
                )}
                </div>
                {popupVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md shadow-lg">
                        <h2 className="text-xl font-bold mb-4">About This Project</h2>
                        <p className="text-gray-700">
                            อธิบาย maybe วิธีใช้งานคร่าวๆรายละเอียด
                        </p>
                        <button
                        onClick={togglePopup}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                        Close
                        </button>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default App;
