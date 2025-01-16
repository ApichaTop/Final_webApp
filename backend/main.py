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
model_name = "b4enq/DepBERT"
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
        
        labels = ["Normal", "Depressed"] # เรียง labels
        result = {labels[i]: float(probabilities[0][i]) for i in range(len(labels))}
        model_pipeline = pipeline('text-classification', model=model_name)
        explainer = shap.Explainer(model_pipeline)
        shap_res = explainer(request.text)
        shap_value =[shap_res.values[0].tolist()]
        print(type(shap_value), len(shap_value))
        tokens = [shap_res.data]
        print(type(tokens), len(tokens))
        return {"text": request.text, "prediction": result, "shap": shap_value, "tokens" : tokens}
    
    except Exception as e:
        # raise HTTPException(status_code=500, detail=str(e))
        print(e);
