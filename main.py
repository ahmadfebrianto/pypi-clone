import uvicorn as uvicorn
from fastapi import FastAPI
from starlette.staticfiles import StaticFiles

from views import home

app = FastAPI()


def configure_router():
    app.include_router(home.router)


def configure_static():
    app.mount('/static', StaticFiles(directory='static'), name='static')


def configure():
    configure_static()
    configure_router()


if __name__ == '__main__':
    configure()
    uvicorn.run('main:app', host='127.0.0.1', port=8000, debug=True)
else:
    configure()
