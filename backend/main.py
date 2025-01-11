from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn.functional as F

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# โหลดโมเดลและ tokenizer
model_name = "unitary/toxic-bert"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

class TextRequest(BaseModel):
    text: str

@app.post("/predict")
async def predict(request: TextRequest):
    try:
        inputs = tokenizer(request.text, return_tensors="pt", padding=True, truncation=True, max_length=512)
        print(f"Tokenized Inputs: {inputs}")

        with torch.no_grad():
            outputs = model(**inputs)
            probabilities = F.softmax(outputs.logits, dim=-1)
            print(f"Logits: {outputs.logits}")
            print(f"Probabilities: {probabilities}")
            print
        
        labels = ["toxic", "non-toxic"] # เรียง labels
        result = {labels[i]: float(probabilities[0][i]) for i in range(len(labels))}
        return {"text": request.text, "prediction": result}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
