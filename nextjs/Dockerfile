FROM node:lts
RUN mkdir /usr/src/otto
RUN apt update
#RUN npm i -g create-next-app
#RUN npx create-next-app@latest usr/src/otto --use-npm --example "https://github.com/vercel/nextjs-postgres-nextauth-tailwindcss-template/tree/main"
COPY ./entrypoint.sh /usr/src
RUN chmod +x /usr/src/entrypoint.sh
ENTRYPOINT ["/usr/src/entrypoint.sh"]
