FROM node:20.12.1

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

EXPOSE 5173

CMD ["npm", "run", "dev"]