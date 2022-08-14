import API from '../../scripts/API/Api';

const setWinnerHOC = (): ((id: number, time: number) => void) => {
  let winner: {
    id: number;
    time: number;
  } | null = null;
  const setWinner = (id: number, time: number) => {
    if (!winner) {
      winner = {
        id,
        time: +(time / 1000).toFixed(2),
      };
      API.getWinners()
        .then((res) => res.json())
        .then(
          (
            res: {
              id: number;
              time: number;
              wins: number;
            }[],
          ) => {
            const isWinner = res.filter(
              (item: { id: number; wins: number; time: number }) => item.id === winner.id,
            );
            if (isWinner.length) {
              API.updateWinner(winner.id, {
                time: isWinner[0].time > winner.time ? isWinner[0].time : winner.time,
                wins: isWinner[0].wins + 1,
              });
            } else {
              API.createWinner({
                id: winner.id,
                time: winner.time,
                wins: 1,
              });
            }
          },
        );
    }
  };
  return setWinner;
};

export default setWinnerHOC;
