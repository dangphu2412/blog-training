# BLOG Training

## Setup
### Environment
- Install nodejs
- First create .env file by this command
```bash
$ cp .env.example ./.env
```
- Config environment variables match to what you want

### Setup Docker
- Configure postgres database variable in docker-compose.yml file
- Configure DATABASE_URL in env file. 
- In this case: DATABASE_URL=postgres://postgres:postgres@db:5432/blog
- Set NODE_ENV in .env file

- Migrate data
```bash
$ yarn migrate:latest
```
- Seed data
```bash
$ yarn seed:run
```

## Start project
- To run project on dev local:
```bash
$ yarn dev
```

- To run project on production:

```bash
$ yarn run build && yarn start
```
