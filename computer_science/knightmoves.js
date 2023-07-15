const knight = (inputPosition = [3, 3]) => {
  const currentPosition = inputPosition;

  function knightMoves(end) {
    function move(start, direction) {
      let newpos;
      if (direction === 1) { newpos = [start[0] + 1, start[1] + 2]; }
      if (direction === 2) { newpos = [start[0] + 2, start[1] + 1]; }
      if (direction === 3) { newpos = [start[0] + 2, start[1] - 1]; }
      if (direction === 4) { newpos = [start[0] + 1, start[1] - 2]; }
      if (direction === 5) { newpos = [start[0] - 1, start[1] - 2]; }
      if (direction === 6) { newpos = [start[0] - 2, start[1] - 1]; }
      if (direction === 7) { newpos = [start[0] - 2, start[1] + 1]; }
      if (direction === 8) { newpos = [start[0] - 1, start[1] + 2]; }
      if (newpos[0] < 1 || newpos[0] > 8 || newpos[1] < 1 || newpos[1] > 8) { newpos = null; }
      return newpos;
    }
    function knightMovesRec(FIFO) {
      const myNode = FIFO.shift();
      if (myNode.position[0] === end[0] && myNode.position[1] === end[1]) { return myNode.steps; }
      for (let i = 1; i < 9; i += 1) {
        const newpos = move(myNode.position, i);
        const newsteps = myNode.steps.slice().concat(newpos);
        if (newpos !== null) {
          FIFO.push({ position: newpos, steps: newsteps });
        }
      }
      return knightMovesRec(FIFO);
    }
    const toEnd = knightMovesRec([{ position: currentPosition, steps: currentPosition }]);
    const numOfMoves = toEnd.length / 2;
    console.log(`=> You made it in ${numOfMoves} moves!  Here's your path:`);
    for (let i = 0; i < numOfMoves; i += 1) {
      console.log([toEnd.shift(), toEnd.shift()]);
    }
  }
  return { knightMoves };
};

const knight1 = knight([1, 1]);
knight1.knightMoves([3, 7]);
