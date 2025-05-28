// Fungsi reusable
const withMinimumLoading = async (
  asyncCallback: () => Promise<void>,
  setLoading: (loading: boolean) => void,
  minDuration: number = 2000
) => {
  setLoading(true);
  const start = Date.now();

  try {
    await asyncCallback();
  } catch (error) {
    throw error;
  } finally {
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, minDuration - elapsed);

    setTimeout(() => {
      setLoading(false);
    }, remaining);
  }
};
export default withMinimumLoading;
