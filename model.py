import tiktoken
import torch
import torch.nn.functional as F
from gpt_model import GPT, GPTConfig  # extract model class

device = "cuda" if torch.cuda.is_available() else "cpu"
enc = tiktoken.get_encoding("gpt2")

model = GPT(GPTConfig).to(device)
checkpoint = torch.load("gpt_model.pt", map_location=device)
model.load_state_dict(checkpoint["model"])
model.eval()


def generate(prompt, max_new_tokens=100):
    tokens = enc.encode(prompt)
    idx = torch.tensor([tokens], device=device)
    out = model.generate(idx, max_new_tokens=max_new_tokens)
    return enc.decode(out[0].tolist())
