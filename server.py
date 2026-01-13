from fastapi import FastAPI
from pydantic import BaseModel

from model import generate

app = FastAPI()


class Prompt(BaseModel):
    text: str


@app.post("/generate")
def gen(prompt: Prompt):
    reply = generate(prompt.text)
    return {"reply": reply}
