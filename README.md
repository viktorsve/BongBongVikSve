# BongBongVikSve

## Introduktion

En applikation som registrerar, uppdaterar och tar bort studenter ur en databas. Består av ett GUI som visar alla studenter i en tabell, där man även kan ta bort specifika studenter och även lägga till nya studenter i ett formulär.

## Innehåll

* [Teoretisk del](#teoretisk-del)
* [Feedback](#feedback)
* [Praktisk del](#praktisk-del)
  * [Frontend](#frontend)
    * [Setup](#setup)
  * [Backend](#backend)
    * [Setup](#setup)
    * [Usage](#usage)
      * [Swagger](#swagger)
      * [URL](#url)
      * [Methods](#methods)
      * [URL Params](#url-params)
      * [Query Params](#query-params)
      * [Data Params](#data-params)
      * [Success Response](#success-response)
      * [Error Response](#error-response)
      * [Sample Call](#sample-call)

## Teoretisk del

### **Hur används HTTP-protokollet när du surfar in på en websida?**
TCP-protokollet används för kommunikation över internet och HTTP-protokollet använder TCP för att skicka information mellan klienter och servrar med hjälp av olika anrop. När man surfar in på en sida så skapas en TCP-anslutning mellan servern och klienten och sedan skickas t.ex. ett HTTP request från klienten som beskriver vad man vill att servern ska skicka tillbaka. Om vi tar http://www.smp.se/kultur-noje/ som exempel så beskriver den första delen av URL:en vilket protokoll som det handlar om. URL:ens domännamn omvandlas sedan till en IP-address som vi gör anrop emot. När en HTTP-uppkoppling har upprättats mellan klienten och servern så finns det möjlighet att skicka request anrop som består av en request metod, en request-URI (path), protokoll-version, host, request headers och eventuell request body (vid POST, PATCH och PUT) i form av den data som vi vill skicka. När anropet har skickats så får vi tillbaka ett response anrop från servern som består av en response code, response headers och en response body i form av den data som vi efterfrågade.


### **Beskriv HTTP-protokollets vanligaste metoder och vad de gör.**
GET, används för att hämta data från en server. POST, används för att lägga till data i en server. DELETE, används för att ta bort data från en server. PUT, används för att modifiera data som finns på servern eller skapa en ny resurs om det inte finns något på den platsen.

### **"http://localhost:3000/users" är en URI, beskriv vilka delar den består av och vad de kallas.**
```
          host    port
       ┌───┴───┐ ┌─┴─┐
http://localhost:3000/users
└─┬─┘  └───┬───┘      └─┬─┘
scheme authority       path
```

Scheme, definerar vilket protokoll det handlar om och dess syntax. Authority består av userinfo, host och port. Userinfo anges om autentisering krävs. Host anger ett namn som kan vara ett domännamn eller en IP-address. Port anger porten till vår host. Path pekar på en specifik plats hos resursen. En URI kan även bestå av query och fragment. Query används för att identifiera information med hjälp av value pairs. Fragment används för att peka till en specifik plats hos resursen.

### **På vilka tre sätt kan man skicka in parametrar i en HTTP-request?**
Path parameters, query parameters, header parameters.

**Path parameters**
```
curl -X GET "http://localhost:3000/students/5cece7fc6813090b94ff5cb9" -H "accept: application/json" | jq

{
  "address": {
    "gata": "Rex Trail",
    "postnummer": "58804-1099",
    "ort": "Howemouth"
  },
  "_id": "5cece7fc6813090b94ff5cb9",
  "email": "Telly.Hoeger@billy.biz",
  "name": "123",
  "__v": 0
}
```

**Query parameters**
```
curl -X GET "http://localhost:3000/students?name=Leanne+Graham" -H "accept: application/json" | jq

[
  {
    "address": {
      "gata": "Rex Trail",
      "postnummer": "58804-1099",
      "ort": "Howemouth"
    },
    "_id": "5cf14d97fe58c734a8dd6244",
    "email": "Telly.Hoeger@billy.biz",
    "name": "Leanne Graham",
    "__v": 0
  }
]
```

**Header parameters**
```
curl -X GET "http://localhost:3000/students/5cece7fc6813090b94ff5cb9" -H "accept: application/json" -v | jq

* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> GET /students/5cece7fc6813090b94ff5cb9 HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.55.1
> accept: application/json
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: *
< Content-Type: application/json; charset=utf-8
< Content-Length: 163
< ETag: W/"a3-A3Z8L8oYQk8/FoyEjyyKjeMXBgU"
< Date: Fri, 31 May 2019 16:09:27 GMT
< Connection: keep-alive
<

{
  "address": {
    "gata": "Rex Trail",
    "postnummer": "58804-1099",
    "ort": "Howemouth"
  },
  "_id": "5cece7fc6813090b94ff5cb9",
  "email": "Telly.Hoeger@billy.biz",
  "name": "123",
  "__v": 0
}
```


## Feedback

**Kursens takt**  
Jag tycker att kursens takt är bra. Det har varit enkelt att hänga med och det som vi har fokuserat på känns relevant.

**Kursmaterial**  
Min uppfattning angående kurslitteraturen är att den känns genomarbetad och är relativt lätt att förstå vilket känns bra.

**Format**  
Något som man kan sakna är mer specifika övningsuppgifter där vi själva får testa att implementera det som vi har lärt oss, t.ex. om vi går igenom put/patch så hade det underlättat om man fick lite övningsuppgifter där man får testa dessa metoder och hitta olika lösningar. Lite mer struktur angående vad vi ska gå igenom varje lektion/vecka hade också varit att föredra.

## Praktisk del

### Frontend

#### Setup

```
$ cd frontend
$ npm install
$ npm start | $ npm test | $ npm run build | $ npm run eject
```

### Backend

#### Setup

```
$ cd backend
$ npm install
$ npm start | $ npm run dev
```

#### Usage

##### Swagger

  http://localhost:3000/BongBong

##### URL

	http://localhost:3000/students

##### Methods

  `GET` | `POST` | `DELETE` | `PUT`

##### URL Params

   /students/{studentId}

##### Query Params

  `email=[string]` | `name=[string]` | `address.gata=[string]` | `address.postnummer=[string]` | `address.ort=[string]`

##### Data Params

 ```
  Students:
  {  
    "email": "string",
    "name": "string",
    "address": {
      "gata": "string",
      "postnummer": "string",
      "ort": "string",
    }
  }
 ```

##### Success Response

  GET /students
  * **Code:** 200 OK
    **Content:**
  ```
    [
      {  
        "email": "string",
        "name": "string",
        "address": {
          "gata": "string",
          "postnummer": "string",
          "ort": "string",
        }
      }
    ]
  ```

  POST /students
  * **Code:** 200 OK
    **Content:**
  ```
    {  
      "email": "string",
      "name": "string",
      "address": {
        "gata": "string",
        "postnummer": "string",
        "ort": "string",
      }
    }
  ```

  GET /students/{studentId}
  * **Code:** 200 OK
    **Content:**
  ```
      {  
        "email": "string",
        "name": "string",
        "address": {
          "gata": "string",
          "postnummer": "string",
          "ort": "string",
        }
      }
  ```

  PUT /students/{studentId}
  * **Code:** 201 Created
    **Content:**
    ```
        {  
          message: "New student created"
        }
    ```

  * **Code:** 200 OK
    **Content:**
    ```
        {  
          message: "Student was updated"
        }
    ```

  * **Code:** 204 No Content
    **Content:**
    ```
        {  
          message: "No student was created or updated"
        }
    ```

  DELETE /students/{studentId}
  * **Code:** 200 OK
    **Content:**
  ```
      {  
        message: "Student deleted successfully!"
      }
  ```

  * **Code:** 204 No Content
    **Content:**
  ```
      {  
        message: "Nothing was removed with id " + {studentId}
      }
  ```

##### Error Response

  GET /students
  * **Code:** 500 Internal Server Error
    **Content:**
    ```
    {
      message: err.message
    }
    ```

  POST /students
  * **Code:** 500 Internal Server Error
    **Content:**
    ```
    {
      message: err.message
    }
    ```

  GET /students/{studentId}
  * **Code:** 404 Not Found
    **Content:**
    ```
    {
      message: "Student not found with that id"
    }
    ```

  * **Code:** 500 Internal Server Error
    **Content:**
    ```
    {
      message: err.message
    }
    ```

  PUT /students/{studentId}
  * **Code:** 404 Not Found
    **Content:**
    ```
    {
      message: "Student not found with that id"
    }
    ```

  * **Code:** 500 Internal Server Error
    **Content:**
    ```
    {
      message: err.message
    }
    ```

  DELETE /students/{studentId}
  * **Code:** 500 Internal Server Error
    **Content:**
    ```
    {
      message: err.message
    }
    ```
##### Sample Call

```
curl -X GET "http://localhost:3000/students" -H "accept: application/json" | jq

[
  {
    "address": {
      "gata": "Douglas Extension",
      "postnummer": "59590415",
      "ort": "McKenziehaven"
    },
    "_id": "5cece7fc6813090b94ff5cb9",
    "email": "Nathan@yesenia.net",
    "name": "Clementine Bauch",
    "__v": 0
  },
  {
    "address": {
      "gata": "Victor Plains",
      "postnummer": "90566-7771",
      "ort": "Wisokyburgh"
    },
    "_id": "5cece81c6813090b94ff5cba",
    "email": "Shanna@melissa.tv",
    "name": "Ervin Howell",
    "__v": 0
  }
]
```

```
curl -X POST "http://localhost:3000/students" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"email\": \"Lucio_Hettinger@annie.ca\", \"name\": \"Chelsey Dietrich\", \"address\": { \"gata\": \"Skiles Walks\", \"postnummer\": \"33263\", \"ort\": \"Roscoeview\" }}" | jq

{
  "_id": "5cee74a6e444bd0c78961e1d",
  "email": "Lucio_Hettinger@annie.ca",
  "name": "Chelsey Dietrich",
  "address": {
    "gata": "Skiles Walks",
    "postnummer": "33263",
    "ort": "Roscoeview"
  },
  "__v": 0
}
```

```
curl -X GET "http://localhost:3000/students/5cee74a6e444bd0c78961e1d" -H "accept: application/json" | jq

{
  "address": {
    "gata": "Skiles Walks",
    "postnummer": "33263",
    "ort": "Roscoeview"
  },
  "_id": "5cee74a6e444bd0c78961e1d",
  "email": "Lucio_Hettinger@annie.ca",
  "name": "Chelsey Dietrich",
  "__v": 0
}
```

```
curl -X DELETE "http://localhost:3000/students/5cece81c6813090b94ff5cba" -H "accept: application/json" | jq

{
  "message": "Student deleted successfully!"
}
```
