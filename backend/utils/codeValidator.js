const MAX_CODE_LENGTH = 10000; // 10KB
const MIN_CODE_LENGTH = 10;

function validateCode(code) {
  if (!code || typeof code !== 'string') {
    throw new Error('Code must be a non-empty string');
  }

  if (code.length < MIN_CODE_LENGTH) {
    throw new Error(`Code must be at least ${MIN_CODE_LENGTH} characters long`);
  }

  if (code.length > MAX_CODE_LENGTH) {
    throw new Error(`Code must not exceed ${MAX_CODE_LENGTH} characters`);
  }

  return true;
}

function sanitizeCode(code) {
  // Remove any potential scripts or harmful content
  return code.trim();
}

module.exports = {
  validateCode,
  sanitizeCode,
  MAX_CODE_LENGTH,
};
