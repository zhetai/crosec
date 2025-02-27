import * as Sentry from '@sentry/node'

export function initSentry(env: Env) {
  Sentry.init({
    dsn: env.SENTRY_DSN,
    environment: env.ENVIRONMENT,
    integrations: [new Sentry.Integrations.Http({ tracing: true })]
  })
}

export function captureWorkerError(error: Error, context: any) {
  Sentry.withScope(scope => {
    scope.setExtra('worker_context', {
      request: context.request.url,
      cf: context.request.cf
    })
    Sentry.captureException(error)
  })
} 