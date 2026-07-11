FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages packages
RUN npm install

FROM deps AS build
COPY apps/web apps/web
WORKDIR /app/apps/web
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app /app
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["npm", "run", "start"]
