const MAX_AMOUNT = 1_000_000_000; // 100 crore, only a sanity bound
const STATUSES = ['active', 'paused', 'completed'];
const MAX_UPDATES = 20;
const MAX_MESSAGE_LENGTH = 500;

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function parseAmount(value, field, errors) {
  if (value === null || value === '') return null;
  const num = typeof value === 'string' ? Number(value.trim()) : value;
  if (typeof num !== 'number' || !Number.isFinite(num) || num < 0 || num > MAX_AMOUNT) {
    errors.push(`${field} must be a number between 0 and ${MAX_AMOUNT}, or null.`);
    return undefined;
  }
  return Math.round(num * 100) / 100;
}

/**
 * Validates an admin update. Only known fields are accepted; anything else is ignored.
 * Returns { errors: string[], data: object } where data only has validated, provided fields.
 */
function validateCampaignUpdate(body) {
  const errors = [];
  const data = {};

  if (!isPlainObject(body)) {
    return { errors: ['Request body must be a JSON object.'], data };
  }

  if ('targetAmount' in body) {
    const v = parseAmount(body.targetAmount, 'targetAmount', errors);
    if (v !== undefined) data.targetAmount = v;
  }
  if ('collectedAmount' in body) {
    const v = parseAmount(body.collectedAmount, 'collectedAmount', errors);
    if (v !== undefined) data.collectedAmount = v;
  }

  if ('status' in body) {
    if (typeof body.status === 'string' && STATUSES.includes(body.status)) {
      data.status = body.status;
    } else {
      errors.push(`status must be one of: ${STATUSES.join(', ')}.`);
    }
  }

  if ('updates' in body) {
    if (!Array.isArray(body.updates) || body.updates.length > MAX_UPDATES) {
      errors.push(`updates must be an array of at most ${MAX_UPDATES} items.`);
    } else {
      const cleaned = [];
      body.updates.forEach((item, i) => {
        const message = isPlainObject(item) ? item.message : undefined;
        if (typeof message !== 'string' || !message.trim() || message.trim().length > MAX_MESSAGE_LENGTH) {
          errors.push(`updates[${i}].message must be 1-${MAX_MESSAGE_LENGTH} characters of text.`);
          return;
        }
        let date = new Date();
        if (item.date !== undefined && item.date !== null) {
          date = new Date(item.date);
          if (Number.isNaN(date.getTime())) {
            errors.push(`updates[${i}].date is not a valid date.`);
            return;
          }
        }
        cleaned.push({ message: message.trim(), date });
      });
      data.updates = cleaned;
    }
  }

  if (Object.keys(data).length === 0 && errors.length === 0) {
    errors.push('Provide at least one of: targetAmount, collectedAmount, status, updates.');
  }

  return { errors, data };
}

module.exports = { validateCampaignUpdate, MAX_AMOUNT, STATUSES };
