interface Props{
    prediction: { [key: string]: number} | null;
    shapvalue:number[][][];
    tokens: Array<string>;
}

function Viz({prediction, shapvalue, tokens} : Props){
    const normal = prediction? prediction.normal : 0;
    const depressed = prediction? prediction.depressed  : 0;
    const condition = normal > depressed;
        return (
            <>
                <div className="text-black">
                    {shapvalue && tokens && (
                        <div className="flex flex-wrap justify-center mt-4">
                            {tokens
                                .filter((word) => word.trim() !== '')
                                .map((word, index) => {
                                    const intensity = Math.min(Math.abs(shapvalue[0][index][condition? 0 : 1]) * 3, 1);
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
            </>
        )
}

export default Viz;