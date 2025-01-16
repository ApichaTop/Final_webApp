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

depbert_model = AutoModelForSequenceClassification.from_pretrained("b4enq/DepBERT")
deprorberta_model = AutoModelForSequenceClassification.from_pretrained("b4enq/DepRoBERTa")
depbert_tokenizer = AutoTokenizer.from_pretrained("b4enq/DepBERT")
deprorberta_tokenizer = AutoTokenizer.from_pretrained("b4enq/DepRoBERTa")
labels = ["normal", "depressed"]

class TextRequest(BaseModel):
    text: str
    model: str 
@app.post("/predict")
async def predict(request: TextRequest):
    try:
        if request.model == "DepBERT":
            model = depbert_model
            tokenizer = depbert_tokenizer
        elif request.model == "DepRoBERTa":
            model = deprorberta_model
            tokenizer = deprorberta_tokenizer
        else:
            raise HTTPException(status_code=400, detail="Invalid model name")

        inputs = tokenizer(request.text, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            probabilities = F.softmax(outputs.logits, dim=-1)

        result = {labels[i]: float(probabilities[0][i]) for i in range(len(labels))}
        return {"text": request.text, "prediction": result,"model": request.model}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))