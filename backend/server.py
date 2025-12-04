from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import shutil

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create uploads directory
UPLOADS_DIR = ROOT_DIR / 'uploads'
UPLOADS_DIR.mkdir(exist_ok=True)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Models
class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str  # Ex: "Élève en Terminale S", "Parent d'élève"
    content: str
    rating: int = Field(ge=1, le=5)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TestimonialCreate(BaseModel):
    name: str
    role: str
    content: str
    rating: int = Field(ge=1, le=5)

class Resource(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    type: str  # "video" or "pdf"
    url: str  # YouTube URL or file path
    category: str  # "Mathématiques" or "Physique"
    level: str  # "Collège", "Lycée", "Prépa"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ResourceCreate(BaseModel):
    title: str
    description: str
    type: str
    url: str
    category: str
    level: str

# Email sending function
async def send_email(to_email: str, subject: str, body: str):
    """Send email notification"""
    try:
        # Configuration email (à personnaliser avec vos vraies credentials)
        smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        smtp_user = os.environ.get('SMTP_USER', 'soufian.bassa@gmail.com')
        smtp_password = os.environ.get('SMTP_PASSWORD', '')
        
        message = MIMEMultipart()
        message['From'] = smtp_user
        message['To'] = to_email
        message['Subject'] = subject
        
        message.attach(MIMEText(body, 'html'))
        
        if smtp_password:  # Only send if password is configured
            await aiosmtplib.send(
                message,
                hostname=smtp_host,
                port=smtp_port,
                start_tls=True,
                username=smtp_user,
                password=smtp_password,
            )
            return True
        return False
    except Exception as e:
        logging.error(f"Error sending email: {e}")
        return False

# Routes
@api_router.get("/")
async def root():
    return {"message": "Bassa Soufian - Cours Particuliers API"}

# Contact routes
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    """Receive and store contact form submission"""
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.contact_messages.insert_one(doc)
    
    # Send email notification
    email_body = f"""
    <h2>Nouveau message de contact</h2>
    <p><strong>Nom:</strong> {input.name}</p>
    <p><strong>Email:</strong> {input.email}</p>
    <p><strong>Téléphone:</strong> {input.phone}</p>
    <p><strong>Message:</strong></p>
    <p>{input.message}</p>
    """
    
    await send_email(
        'soufian.bassa@gmail.com',
        f'Nouveau contact de {input.name}',
        email_body
    )
    
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages"""
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    
    for msg in messages:
        if isinstance(msg['timestamp'], str):
            msg['timestamp'] = datetime.fromisoformat(msg['timestamp'])
    
    return messages

# Testimonials routes
@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(input: TestimonialCreate):
    """Create a new testimonial"""
    testimonial_dict = input.model_dump()
    testimonial_obj = Testimonial(**testimonial_dict)
    
    doc = testimonial_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.testimonials.insert_one(doc)
    return testimonial_obj

@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get all testimonials"""
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(1000)
    
    for t in testimonials:
        if isinstance(t['timestamp'], str):
            t['timestamp'] = datetime.fromisoformat(t['timestamp'])
    
    return testimonials

@api_router.delete("/testimonials/{testimonial_id}")
async def delete_testimonial(testimonial_id: str):
    """Delete a testimonial"""
    result = await db.testimonials.delete_one({"id": testimonial_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Testimonial not found")
    return {"message": "Testimonial deleted successfully"}

# Resources routes
@api_router.post("/resources", response_model=Resource)
async def create_resource(input: ResourceCreate):
    """Create a new resource"""
    resource_dict = input.model_dump()
    resource_obj = Resource(**resource_dict)
    
    doc = resource_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.resources.insert_one(doc)
    return resource_obj

@api_router.get("/resources", response_model=List[Resource])
async def get_resources():
    """Get all resources"""
    resources = await db.resources.find({}, {"_id": 0}).to_list(1000)
    
    for r in resources:
        if isinstance(r['timestamp'], str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    
    return resources

@api_router.delete("/resources/{resource_id}")
async def delete_resource(resource_id: str):
    """Delete a resource"""
    result = await db.resources.delete_one({"id": resource_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Resource not found")
    return {"message": "Resource deleted successfully"}

@api_router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """Upload a PDF file"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    
    file_id = str(uuid.uuid4())
    file_path = UPLOADS_DIR / f"{file_id}_{file.filename}"
    
    with open(file_path, 'wb') as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return {"file_id": file_id, "filename": file.filename, "url": f"/api/files/{file_id}_{file.filename}"}

@api_router.get("/files/{filename}")
async def get_file(filename: str):
    """Download a file"""
    file_path = UPLOADS_DIR / filename
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return FileResponse(file_path)

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()