/**
 *
 * @param fn async function to retry on fail
 * @param retries default is 3
 * @returns Promise<T> - call the function like this: await withRetry<YourType>(fn, retries)
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 3
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      return await withRetry(fn, retries - 1);
    }
    throw error;
  }
}
