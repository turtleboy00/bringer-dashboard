FROM python:3

WORKDIR /usr/src/bringer
EXPOSE 8000

COPY . .
RUN mv example.env backend.env
RUN pip install -r requirements.txt
RUN python ./manage.py migrate delivery
RUN python ./manage.py makemigrations
RUN python ./manage.py loaddata data/delivery.json
CMD [ "python", "./manage.py", "runserver", "0.0.0.0:8000" ]