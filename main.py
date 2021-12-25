import uvicorn as uvicorn
from fastapi import FastAPI
from views import home

app = FastAPI()


def configure_router():
    app.include_router(home.router)


def configure():
    configure_router()


if __name__ == '__main__':
    configure()
    uvicorn.run('main:app', host='127.0.0.1', port=8000, debug=True)
else:
    configure()
