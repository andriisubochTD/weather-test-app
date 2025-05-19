FROM node:22.14.0
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && npm install
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]
