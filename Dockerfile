FROM public.ecr.aws/docker/library/node:22-alpine AS base

ARG SERVICE_NAME=@retrospective-board/api
WORKDIR /app
ENV PATH="/app/node_modules/.bin:/pnpm:$PATH"
RUN npm i -g corepack@latest && corepack enable

FROM base AS build
COPY pnpm-*.yaml package.json tsconfig.json turbo.json .npmrc ./
COPY tsconfig.base.json ./
COPY packages ./packages
COPY apps/api ./apps/api
RUN --mount=type=secret,id=NODE_AUTH_TOKEN,env="NODE_AUTH_TOKEN" pnpm --filter=${SERVICE_NAME} --prod deploy /out
RUN sed -i '/"name":/a \  "type": "module",' /out/package.json
COPY tsconfig.base.json /out/tsconfig.json

FROM base AS app
COPY --from=build /out ./
EXPOSE 3000

ENV ECS_ENABLE_CONTAINER_METADATA=true

CMD ["tsx", "./src/main.ts"]
