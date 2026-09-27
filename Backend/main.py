import os
import secrets

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import cloudinary
import cloudinary.api
import cloudinary.utils
import cloudinary.uploader

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://jpb-nu.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ACCESS_CODE = os.getenv("ACCESS_CODE")

active_tokens = set()

class AuthRequest(BaseModel):
    code: str


@app.get("/")
def root():
    return {
        "message": "Backend funcionando"
    }


@app.post("/auth")
def authenticate(data: AuthRequest):

    if data.code != ACCESS_CODE:
        raise HTTPException(
            status_code=401,
            detail="Código incorrecto"
        )

    token = secrets.token_urlsafe(32)

    active_tokens.add(token)

    return {
        "message": "Acceso autorizado",
        "token": token
    }


@app.get("/gallery")
def get_gallery(
    authorization: str | None = Header(default=None)
):

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="No autorizado"
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Formato de autorización inválido"
        )

    token = authorization.replace("Bearer ", "")

    if token not in active_tokens:
        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )

    images = [
        {
            "id": "First_Date",
            "label": "Nuestra primera cita",
            "public_id": "nuestra-historia/First_Date"
        },
        {
            "id": "Third_Date",
            "label": "Nuestra tercera cita",
            "public_id": "nuestra-historia/Third_Date"
        },
        {
            "id": "Working",
            "label": "Tu toda linda trabajando",
            "public_id": "nuestra-historia/Working"
        },
        {
            "id": "Running",
            "label": "Nuestro primer día de running juntos",
            "public_id": "nuestra-historia/Running"
        },
        {
            "id": "Together",
            "label": "Me encanta tener tu mano en la mía",
            "public_id": "nuestra-historia/Together"
        },
        {
            "id": "I'd_still_choose_you",
            "label": "Si pudiera conocerte de nuevo, me volvería a enamorar de ti 🌻❤️",
            "public_id": "nuestra-historia/I'd_still_choose_you"
        },
        {
            "id": "Future...",
            "label": "Quiero muchos más momentos contigo",
            "public_id": "nuestra-historia/futuroJPB"
        }
    ]

    for image in images:

        image["url"] = cloudinary.utils.cloudinary_url(
            image["public_id"],
            type="authenticated",
            sign_url=True,
            secure=True
        )[0]

    return {
        "images": images
    }

# result = cloudinary.uploader.upload(
#     "futuroJPB.jpeg",
#     type="authenticated",
#     folder="nuestra-historia",
#     public_id="futuroJPB",
# )
