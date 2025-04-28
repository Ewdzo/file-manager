FROM node:18-alpine

ENV PORT=80

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

CMD [ "npm", "run", "start" ]