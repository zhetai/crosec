export async function logAuditEvent(event: AuditEvent, env: Env) {
  await env.DB.prepare(`
    INSERT INTO audit_log (user_id, event_type, data)
    VALUES (?1, ?2, ?3)
  `).bind(
    event.userId,
    event.type,
    JSON.stringify(event.data)
  ).run()
} 