Ändringar jag har gjort i mitt webb-API:

* Tillät CORS för att kunna göra requests från klient-appen

* Lade till att resursens id ska skickas med för varje resurs som begärs (i only-arrayen i modellklasserna), för att kunna använda id:t för att länka till en specifik resurs

* Fixade en bugg i index-metoden i attractions controller så att det nu går att få ut samtliga turistattraktioner skapade av en viss användare, samt samtliga turistattraktioner tillhörande en viss tagg (jag hade placerat limit och offset efter user och tag i stället för efter user.attractions och tag.attractions). I klientapplikationen får man en lista på alla turistattraktioner tillhörande resursen om man går till t.ex. .../users/10 eller .../tags/10.

* Ändrade så att det nu vid varje anrop kontrolleras att en API-nyckel har skickats med, och inte bara vid de anrop som inte kräver inloggning

* Ändrade så att även userid returneras när en JSON web token returneras, för att kunna göra ett anrop så att den inloggade användarens turistattraktioner visas. Det är väl egentligen onödigt eftersom userid lagras i payload, men det var enklare att returnera id:t separat från   token och spara det i rootScope.

* Tog bort userid från strong params/attraction params, eftersom userid redan finns lagrat i JWT payload och därför inte behöver skickas med när man gör en PUT eller POST request
