from pymongo import MongoClient
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = MongoClient("mongodb://localhost:27017/")
# client = MongoClient("mongodb://mongo:27017/")

db = client["mockdb"]
collection = db["mockcollection"]

class Product(BaseModel):
    product: str

@app.get("/")
async def welcome():
    return {"Message": "Welcome"}

@app.post("/")
async def save_product(item: Product):
    product_name = item.product
    data = {"name": product_name}
    result = collection.insert_one(data)
    return {"message": str(result.inserted_id)}

