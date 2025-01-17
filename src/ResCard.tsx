import React from "react";

interface Props{
    scrollRef: React.RefObject<HTMLParagraphElement>,
    prediction: { [key: string]: number} | null,
    inputText: string,
    shapvalue: Array<number>,
    tokens: Array<string>
}

const ResCard: React.FC<Props> = ({ scrollRef, prediction, inputText, shapvalue, tokens}) =>{

    return (
            <div className="min-h-screen flex bg-gray-100 justify-center items-center">
                <div ref={scrollRef} className="w-full max-w-md bg-white p-6 rounded shadow-md mt-6">
                    {prediction && (
                        <div>
                            <p>Text: {inputText}</p>
                            <p>Non-toxic: {prediction.normal}</p>
                            <p>Toxic: {prediction.depressed}</p>
                        </div>
                    )}
                    {shapvalue && (
                        <div>
                            <ul>
                                {shapvalue.map((value, index) => (
                                    <li key={index}>{value}</li> // Display each SHAP value
                                ))}
                                {tokens.map((word) => (
                                    <li >{word}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
    )
}
export default ResCard;