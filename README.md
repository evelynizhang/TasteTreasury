# Taste Treasury

## Built With

![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Development Team

- John Rangel
- Evelyn Zhang
- Jonah Heskje
- Erick Conners

Taste Teasury:
Bringing you all the recipes you want.
Adding or choosing recipes you need.
Never losing the one's you love.

##

## Design

- [Fast API](docs/apis.md)
- [Data Model](docs/data.model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

##

## Intended users

Our web app is designed for the everyday food enthusiast who seeks a user-friendly experience in the culinary world. Whether you're a cooking connoisseur, an adventurous home chef, or someone who simply wants the convenience of accessing your recipes from anywhere, our app caters to your needs and offers a seamless cooking experience.

##

## Functionality

- Users can access a detailed recipe page by clicking on their previously created recipes, allowing them to view the list of ingredients and step-by-step directions.

- For logged-in users, the platform offers the flexibility to create, edit, and delete recipes of their choice.

- An integrated search feature simplifies navigation for logged-in users by helping them quickly locate specific recipes.

- The addition of a tag feature provides descriptive information about the type of each recipe.

- An "All Recipes" page offers a straightforward, plain list view of all available recipes.

##

## Project Initialization

To use this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create pg-admin` and `docker  volume create recipe-data`
4. Run `docker compose build`
5. Run `docker compose up`
