interface Props {
    prediction: { [key: string]: number } | null;
    shapvalue: number[][][];
    tokens: Array<string>;
    selectedTokenIndex: number | null;
    onTokenClick: (index: number) => void;
  }
  
  function Viz({ prediction, shapvalue, tokens, selectedTokenIndex, onTokenClick }: Props) {
    const normal = prediction ? prediction.normal : 0;
    const depressed = prediction ? prediction.depressed : 0;
    const condition = normal > depressed;
  
    return (
      <>
        <div className="text-black">
          {shapvalue && tokens && (
            <div className="flex flex-wrap justify-center mt-4">
              {tokens
                .filter((word) => word.trim() !== '')
                .map((word, index) => {
                  const shapVal = shapvalue[0][index][condition ? 0 : 1];
                  const intensity = Math.min(Math.abs(shapVal) * 3, 1);
                  const isSelected = index === selectedTokenIndex;
  
                  return (
                    <div 
                    key={index} 
                    className="flex flex-col items-center m-2"
                    >
                      {isSelected && (
                        <div className="text-sm text-black mb-1 font-mono">
                          SHAP: {shapVal.toFixed(4)}
                        </div>
                      )}
                      <div
                        className="px-3 py-1 rounded-lg border border-gray-300 cursor-pointer"
                        style={{
                          backgroundColor: `rgba(255, 0, 0, ${intensity})`,
                        }}
                        onClick={() => onTokenClick(index)}
                      >
                        {word}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </>
    );
  }
  
  export default Viz;
  