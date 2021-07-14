## Run project

- Clone repository
- `npm run install:all`
- `cd client-side/web-app`
- `npm run develop`

## Notes

- All code related to the exercise is in `client-side/web-app/src/components/templates/index/` directory

- Estirador shares common `npm` libraries because the API `node_modules` directory is in an upper parent directory than the web app. For that matter, I normally install isomorphic libraries like `faker` (used in the exercise) in `./package.json` instead of `./client-side/web-app/package.json`. That way, both frontend and backend share the same version of the same package that they both use

- If you run `npm run precommit`, a build process consisting of typescript types validation and linting will take place. It will end with a report on the total size of the web app and which packages take up the most space
