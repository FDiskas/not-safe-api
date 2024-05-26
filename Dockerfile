FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY patches ./
COPY index.ts ./

RUN bun install
CMD [ "bun", "index.ts"]