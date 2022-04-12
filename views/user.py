from fastapi import APIRouter
from starlette.requests import Request
from starlette.templating import Jinja2Templates

router = APIRouter()
templates = Jinja2Templates(directory="templates")


@router.get("/register")
async def register(request: Request):
    context = {
        "request": request,
        "title": "Register",
    }
    return templates.TemplateResponse("user/register.html", context)


@router.get("/login")
async def login(request: Request):
    context = {
        "request": request,
        "title": "Login",
    }
    return templates.TemplateResponse("user/login.html", context)