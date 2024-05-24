FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18 AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm install --production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
ENV NODE_ENV production
EXPOSE 3001
CMD ["npm", "start"]
