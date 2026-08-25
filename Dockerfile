# ProjectX website — production image.
#
# Multi-stage: dependencies, build, then a runtime layer that carries only Next's standalone
# output. The site holds no secret and touches no database, so the runtime stage needs
# nothing but node and the built server.

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so they are build
# arguments rather than runtime environment. Rebuild when they change.
ARG NEXT_PUBLIC_DAPP_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_DAPP_URL=$NEXT_PUBLIC_DAPP_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=4000

# Unprivileged. The process serves static content and makes one outbound HTTP call; it has
# no reason to be able to write anywhere it does not already own.
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 4000

# PROTOCOL_API_URL is read at request time and is intentionally not baked in: the same image
# runs against a local daemon and a production one.
CMD ["node", "server.js"]
