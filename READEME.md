**Bridger Challenge**
===========================
> Fun coding challenge for Bridger. 
REST API built with Django and React Framework with JWT.

<details open="open">
  <summary>Table of Contents</summary>
  <ul>
    <li>
        <a href="#getting-started"> Getting Started</a>
    </li>
    <li>
        <a href="#default">  Default Users </a>
    </li>
    <li>
        <a href="#progress">  In Progress </a>
    </li>
  </ul>
</details>

<span id="getting-started">**Getting Started**</span>
----------------------------

## Docker

This project uses docker-compose to build a React and Express container.
```docker
docker-compose up -d
```
Running the above command launches a "bringer_fe" and "bringer_be" container. The image exposes port 8000 of the container. 

## Local
### Frontend
```
cd frontend
```

Create environment file
```
mv example.env .env
```

Install modules
```
npm i
```

Start frontend
```
npm start
```
### Backend
```
cd backend
```
Create environment file
```
mv example.env backend.env
```

Create environment
```
python -m venv env
```

Activate environment
```
. env/bin/activate (linux/mac)
env\Scripts\activate (windows)
```

Install modules
```
pip install -r requirements.txt
```

Setup database
```
python ./manage.py migrate delivery
python ./manage.py makemigrations
```

Load delivery data
```
python ./manage.py loaddata data/delivery.json
```

Start backend
```
python ./manage.py runserver 0.0.0.0:8000
```



<span id="default">**Default Users**</span>
--------
<hr>

```
{ admin, admin }
```
**Note**: This is the default usernames and passwords. 

**For docker:**
backend -> 9030  <br>
frontend -> 9040

**For local:**
backend -> 3000  <br> 
frontend -> 8000

> Once the container has **completely started**, perform requests to the any endpoint.

<span id="progress">**In Progress**</span>
--------
<hr>

* Docker
* Nginx
* Integration tests
* Unit tests