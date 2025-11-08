FROM public.ecr.aws/docker/library/node:22-alpine AS base

ARG SERVICE_NAME
WORKDIR /app
ENV PATH="/app/node_modules/.bin:/pnpm:$PATH"
RUN npm i -g corepack@latest && corepack enable

FROM base AS build
COPY pnpm-*.yaml package.json tsconfig.json turbo.json .npmrc ./
COPY packages ./packages
COPY services/${SERVICE_NAME} ./services/${SERVICE_NAME}
RUN --mount=type=secret,id=NODE_AUTH_TOKEN,env="NODE_AUTH_TOKEN" pnpm --filter=${SERVICE_NAME} --prod deploy /out
RUN sed -i '/"name":/a \  "type": "module",' /out/package.json
COPY tsconfig.json /out/tsconfig.json

FROM base AS app
COPY --from=build /out ./
EXPOSE 3000

ENV ECS_ENABLE_CONTAINER_METADATA=true

CMD ["tsx", "./src/main.ts"]
