FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY apps/server/package.json apps/server/package.json
COPY packages packages
RUN npm install

FROM deps AS build
COPY apps/server apps/server
WORKDIR /app/apps/server
RUN npm run db:generate && npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app /app
WORKDIR /app/apps/server
EXPOSE 4000
CMD ["npm", "run", "start"]
