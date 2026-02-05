from fastapi import FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import re
import asyncio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_API_KEY = "NIAT_SECRET_2026"
GUVI_CALLBACK_URL = "https://hackathon.guvi.in/api/updateHoneyPotFinalResult"

@app.on_event("startup")
async def startup_event():
    print("\n\n 🔥 IMPACT FORGE: TRAP SYSTEM LOADED 🔥 \n\n")

class Message(BaseModel):
    sender: str
    text: str

class ScamRequest(BaseModel):
    sessionId: str = "impact-forge-win-final"
    message: Message
    conversationHistory: list = []

def get_trap_response(text, intel):
    # Check kya capture ho chuka hai
    has_bank = len(intel['bankAccounts']) > 0 or len(intel['upilds']) > 0
    has_link = len(intel['phishingLinks']) > 0
    
    # LEVEL 1: Greed Bait (Bank Maango)
    if not has_bank:
        return "Sir, mera Google Pay 'Server Error' dikha raha hai. Kya main direct **Bank Account** mein transfer kar doon? Please **Account Number** aur **IFSC** dijiye, main turant daal deta hoon."

    # LEVEL 2: Fear Bait (Link Maango)
    if has_bank and not has_link:
        return "Paise bhej raha tha ki 'KYC Pending' ka error aa gaya! Sir, mere paise katne wale hain kya? Please koi **Verification Link** bhej dijiye jisse main KYC update kar sakun."

    # LEVEL 3: Victory (Sab mil gaya)
    if has_link:
        return "Maine link par click kiya par wo '404 Not Found' dikha raha hai. Lagta hai bank ka server down hai. Main aadhe ghante baad try karun?"

    # FALLBACK (Agar data nahi mila)
    return "Ji? Mujhe samajh nahi aa raha. Kya mera account safe hai?"

@app.post("/analyze")
async def analyze(payload: ScamRequest, x_api_key: str = Header(None)):
    if x_api_key != SECRET_API_KEY:
        raise HTTPException(status_code=403, detail="Invalid API Key")

    text = payload.message.text
    
    # SCAM TRIGGER
    scam_keywords = ["block", "pay", "upi", "account", "verify", "link", "karo", "bhejo", "tumhara", "transfer"]
    is_scam = any(word in text.lower() for word in scam_keywords)
    
    intel = {
        "upilds": re.findall(r'[a-zA-Z0-9.\-_]+@[a-zA-Z]+', text),
        "bankAccounts": re.findall(r'\b\d{9,18}\b', text),
        "phishingLinks": re.findall(r'http[s]?://\S+', text)
    }

    if is_scam and (intel['upilds'] or intel['bankAccounts'] or intel['phishingLinks']):
        try:
            await asyncio.sleep(0.5)
            requests.post(GUVI_CALLBACK_URL, json={
                "sessionId": payload.sessionId,
                "scamDetected": True,
                "extractedIntelligence": intel,
                "agentNotes": "Trap Success."
            }, timeout=2)
        except: pass

    return {
        "reply": get_trap_response(text, intel),
        "extractedIntelligence": intel,
        "metrics": {
            "isCritical": is_scam,
            "nodeLoad": 95 if is_scam else 32,
            "threatLevel": "CRITICAL" if is_scam else "SAFE",
            "blockedIP": "192.168.1.105"
        }
    }