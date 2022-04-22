// contains miscellaneous constants

function misc() {
  // to convert song duration
  const convertDuration = (duration: number) => {
    const toMinutes = Math.floor(duration / 60000);
    let toSeconds = ((duration % 60000) / 1000).toFixed(0);
    if (toSeconds.length === 1) {
      toSeconds = 0 + toSeconds;
    }
    return `${toMinutes}:${toSeconds}`;
  };

  // use hook to remove data-testId from production code
  const useTestId = (id: string) => {
    if (process.env.NODE_ENV !== "test") return {};
    return {
      "data-testid": id,
    };
  };

  return { convertDuration, useTestId };
}

export default misc;
