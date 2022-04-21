function misc() {
  const convertDuration = (duration: number) => {
    const toMinutes = Math.floor(duration / 60000);
    let toSeconds = ((duration % 60000) / 1000).toFixed(0);
    if(toSeconds.length === 1){
        toSeconds = 0+toSeconds;
    }
    return (`${toMinutes}:${toSeconds}`);
  };

  return { convertDuration };
}

export default misc;