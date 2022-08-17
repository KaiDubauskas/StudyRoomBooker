# Study Room Booker
## Description
A web-based application to simulate reserving study rooms in different buildings at Vanderbilt University.

[![Watch the video](https://img.youtube.com/vi/hV6yuQxq5Ng/maxresdefault.jpg)](https://youtu.be/hV6yuQxq5Ng)
<p align="center">^ Click to view website walthrough ^</p>

### The problem

During most of the school year, the demand of study rooms at Vanderbilt matches the supply. The one exception is during finals week, where open study rooms are far and few between. There was no way to see which study rooms in which buildings were open, and which were closed, forcing students to walk halfway around campus to find an open room to study in. This program was created to solve this problem, by allowing students to reserve and occupy study rooms. Others can then see which study rooms are occupied or open, eliminting the need to walk between multiple buildings to find a room. 

## How It Works

- Was built using the MERN stack: MongoDB, Express, React, Node. 
- Backend server was later deployed with MongoDb Realm to make the site serverless.
- Database consists of two collections:
  - Rooms with the fields:
    - Object ID
    - The building it's in
    - What floor it's on
    - Room number
    - Open time
    - Closing time
    - Array of available times. 
  - Reservations with the fields:
    - Object ID
    - Student Id
    - Name
    - Start time
    - Length of reservation
    - ID of the room reserved
    
 
## Improvements and Further Projects

This was my first time utilizing a database to store information, meaning it was hastily designed and put together. Using a non-relational database like MongoDB means I have the option of nesting my documents. To make my search queries faster, I could keep an array of Reservation documents within each Room document. Right now, the query searches through the entire Reservations collection and checks if each reservation belongs to a specific room. With nested documents, the query would only have to iterate through each reservation embedded in a Room Document, exponentially decreasing the runtime. The drawback to this approach is that iterating through all reservations would require first accessing each room document, but since I never need to search through all reservations, this wouldn't be a problem.

Some other small improvements can be made with the UI. For example, since American's don't use military time, I could swith to Standard Time. I also use 0.5 to represent half hours (eg 3.5 = 3:30). In the future, I could switch this so it's clearer what time each reservation is at. 

To expand on this project, I could add a login and authentication system so users can view their current reservations and edit, move, or delete them. 

I could also use what I learned to create reservation systems for other utilies such as music rooms, parking spaces, and restaurants. 

