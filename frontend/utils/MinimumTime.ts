export const withMinimumLoading = async <T>(
  asyncCallback: () => Promise<T>,
  setLoading: (loading: boolean) => void,
  minDuration: number = 1000
): Promise<T> => {
  setLoading(true);
  const start = Date.now();

  try {
    const result = await asyncCallback();
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, minDuration - elapsed);

    await new Promise((res) => setTimeout(res, remaining));
    return result;
  } catch (error) {
    throw error;
  } finally {
    setLoading(false);
  }
};
