# Fruitful
_A medium-sized (work in progress) social media platform, completely typescript._
## Running in dev:
- `npm install`
- Create .env file and fill in the variables from .env.template (in top-level dir and client dir)
- Create _fruitful_ db, postgres in my case, if MySQL then update env file
- `npm run dev`

## Build:
- Run `npm install` (in top-level dir and _client_ dir)
- Create .env file and fill in the variables from .env.template (in top-level dir and do same in _client_ dir except name the env file .env.local)
- Create _fruitful_ db, postgres in my case, if MySQL then update env file
- DB migrations: `npm run typeorm migration:run`
- Run `npx tsc` to transpile ts server
- Run `npm run build` in _client_ dir
- Run `npm start` in top-level to start server, `npm start` in _client_ dir to start next app

## Credits:
All the graphics/icons come from Pexels and FA.