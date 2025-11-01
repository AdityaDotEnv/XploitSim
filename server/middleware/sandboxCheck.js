/**
 * Ensures the app is running in sandbox mode.
 * - Exits if NODE_ENV === 'production'.
 * - Exits if SANDBOX !== '1'.
 */

module.exports = function sandboxCheck() {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const sandboxFlag = process.env.SANDBOX;
  if (nodeEnv === 'production') {
    console.error('Refusing to run: NODE_ENV is "production". This sandbox is for development use only.');
    process.exit(1);
  }
  if (!sandboxFlag || String(sandboxFlag) !== '1') {
    console.error('Refusing to run: SANDBOX is not enabled. Set SANDBOX=1 in your environment (local dev only).');
    process.exit(1);
  }
  console.warn('*** RUNNING IN SANDBOX MODE (SANDBOX=1). THIS SERVER IS INTENTIONALLY VULNERABLE. ***');
};
