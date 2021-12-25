from fastapi import APIRouter
from starlette.requests import Request
from starlette.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="templates")


@router.get("/")
async def home(request: Request):
    context = {
        "request": request,
        "title": "Home",
    }
    return templates.TemplateResponse("home/home.html", context)
