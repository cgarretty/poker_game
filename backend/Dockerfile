FROM python:3.8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY Pipfile ./Pipfile
COPY Pipfile.lock ./Pipfile.lock

RUN pip install pipenv 
RUN pipenv install --system --deploy --ignore-pipfile

COPY . /code/