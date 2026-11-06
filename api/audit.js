import { createAuditHandler } from '../server/audit.mjs';

export default { fetch: createAuditHandler() };
