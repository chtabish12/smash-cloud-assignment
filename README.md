###### Start
# npm i <--OR--> npm install

# npm start


##### Routes
## Vehicle Enter:
# 1. post call
http://localhost:8000/tollEntry
Body:
Interchange:Ferozpur Interchange
numberPlate:LXL-150
dateTime:Tue, 27 December 2022 14:50:20 GMT

## Vehicle Leave
# 2. post call
http://localhost:8000/tollExit/:id
Body:
Interchange:Raiwand Interchange
numberPlate:LXL-150
dateTime:Tue, 27 December 2022 20:50:20 GMT