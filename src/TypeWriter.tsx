import React, { useEffect, useRef } from "react";

const TypeWriterComponent: React.FC = () => {
    const typewriterRef = useRef<HTMLParagraphElement>(null) ;
    const text = ["Depression", "Emotion :)", "Feeling Sad :("];
    let i = 0;
    let j = 0;
    let current_word = "";
    let isDelete = false;
    function typeWrite() {
        if (typewriterRef.current) {
            current_word = text[i];
            if(isDelete){
                typewriterRef.current.textContent = current_word.substring(0, j - 1);
                j--;
                if(j == 0){
                    isDelete = false;
                    i++;
                    if(i == text.length){
                        i = 0;
                    }
                }
            }
            else {
                typewriterRef.current.textContent = current_word.substring(0, j + 1);
                j++;
                if(j == current_word.length){
                    isDelete = true;
                }
            }
            setTimeout(typeWrite, 200);

        }
    }
    useEffect(() => {
        typeWrite();
    }, [])

    return (
        <p 
        ref={typewriterRef}
        id="typewriter"
        className="text-5xl font-Latin-Modern transition-all duration-1000"
        ></p> 
    );
};

export default TypeWriterComponent;