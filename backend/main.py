from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from fastapi.middleware.cors import CORSMiddleware
import torch
import torch.nn.functional as F
import shap

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# โหลดโมเดลและ tokenizer
bert_ = "b4enq/DepBERT"
roberta_ = "b4enq/DepRoBERTa"
tokenizer = AutoTokenizer.from_pretrained(bert_)
model = AutoModelForSequenceClassification.from_pretrained(bert_)

depbert_model = AutoModelForSequenceClassification.from_pretrained(bert_)
deprorberta_model = AutoModelForSequenceClassification.from_pretrained(roberta_)

depbert_tokenizer = AutoTokenizer.from_pretrained(bert_)
deprorberta_tokenizer = AutoTokenizer.from_pretrained(roberta_)
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
            print(f"Logits: {outputs.logits}")
            print(f"Probabilities: {probabilities}")
            print
        
        result = {labels[i]: float(probabilities[0][i]) for i in range(len(labels))}

        model_pipeline = pipeline('text-classification', model=bert_)
        explainer = shap.Explainer(model_pipeline)
        shap_res = explainer(request.text)
        shap_value =[shap_res.values[0].tolist()]
        print(type(shap_value), len(shap_value))
        tokens = [shap_res.data]
        print(type(tokens), len(tokens))
        return {"text": request.text, "prediction": result, "model": request.model, "shap": shap_value, "tokens" : tokens}
    
    except Exception as e:
        # raise HTTPException(status_code=500, detail=str(e))
        print(e);
