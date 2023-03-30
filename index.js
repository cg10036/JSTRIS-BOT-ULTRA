const CONFIG = { // FAST, HUMANIZE
  DAS: 50, // set null to use default DAS
  ARR: 0, // set null to use default ARR
  DELAYS: {
    DOWN: 5, // delay after key down
    UP: 5, // delay after key up
    HUMANIZE: 10, // maximum value to key DOWN, UP delay (random)
    ROTATE: 50, // maximum value to rotate before delay (random)
    DROP_MIN: 5, // minimum value to drop after delay (random)
    DROP_MAX: 15, // maximum value to drop after delay (random)
  },
  ROTATE_HUMANIZE: true,
  ULTRA_HUMANIZE: true, // When you need to place a block at the very end or in front of one space, move the block all the way to the end like a human and then come back.
};
// const CONFIG = { // SUPERFAST
//   DAS: 10, // set null to use default DAS
//   ARR: 0, // set null to use default ARR
//   DELAYS: {
//     DOWN: 1, // delay after key down
//     UP: 1, // delay after key up
//     HUMANIZE: 0, // maximum value to key DOWN, UP delay (random)
//     ROTATE: 0, // maximum value to rotate before delay (random)
//     DROP_MIN: 1, // minimum value to drop after delay (random)
//     DROP_MAX: 1, // maximum value to drop after delay (random)
//   },
//   ROTATE_HUMANIZE: false, // rotate like human
//   ULTRA_HUMANIZE: true, // When you need to place a block at the very end or in front of one space, move the block all the way to the end like a human and then come back.
// };

const EVENT = {
  GAME_ENDED: "gameEnded",
  GAME_PLAYING: "play",
  GAME_STARTING: "starting",
};

const KEY = {
  SPACE: 32,
  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  C: 67,
  A: 65,
  Z: 90,
};

const eventListener = (name, val) => {
  if (name === EVENT.GAME_PLAYING && val === true) {
    auto();
  }
};

Game.prototype.isPmode = function (_0xce15x4) {
  if (!window.GAME) {
    window.GAME = this;
    Object.values(EVENT).forEach((e) => {
      GAME[`_${e}`] = GAME[e];
      Object.defineProperty(GAME, e, {
        get: () => GAME[`_${e}`],
        set: (val) => {
          GAME[`_${e}`] = val;
          eventListener(e, val);
        },
      });
    });
    if (CONFIG.DAS) {
      GAME.Settings.DAS = CONFIG.DAS;
    }
    if (CONFIG.ARR) {
      GAME.Settings.ARR = CONFIG.ARR;
    }
    GAME.Settings.ARR = 0;
    console.log("SET");
  }
  return _0xce15x4 ? this.pmode : this.livePmode ? this.livePmode : this.pmode;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const keyInput = async (
  keyCode,
  ms_down = CONFIG.DELAYS.DOWN,
  ms_up = CONFIG.DELAYS.UP,
  humanize = CONFIG.DELAYS.HUMANIZE
) => {
  GAME.keyInput2(new KeyboardEvent("keydown", { keyCode }));
  await sleep(ms_down + Math.round(Math.random() * humanize));
  GAME.keyInput3(new KeyboardEvent("keyup", { keyCode }));
  await sleep(ms_up + Math.round(Math.random() * humanize));
};

const BLOCKS = [
  [
    [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ],
    [
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
    ],
  ],
  [
    [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [0, 1, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [0, 0, 1, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 1, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [1, 0, 0, 0],
      [1, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [1, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [1, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
];
const BLOCKS_POS = {
  0: {
    0: {
      left: 0,
      right: 6,
    },
    1: {
      left: -2,
      right: 7,
    },
    2: {
      left: 0,
      right: 6,
    },
    3: {
      left: -1,
      right: 8,
    },
  },
  1: {
    0: {
      left: -1,
      right: 7,
    },
    1: {
      left: -1,
      right: 7,
    },
    2: {
      left: -1,
      right: 7,
    },
    3: {
      left: -1,
      right: 7,
    },
  },
  2: {
    0: {
      left: 0,
      right: 7,
    },
    1: {
      left: -1,
      right: 7,
    },
    2: {
      left: 0,
      right: 7,
    },
    3: {
      left: 0,
      right: 8,
    },
  },
  3: {
    0: {
      left: 0,
      right: 7,
    },
    1: {
      left: -1,
      right: 7,
    },
    2: {
      left: 0,
      right: 7,
    },
    3: {
      left: 0,
      right: 8,
    },
  },
  4: {
    0: {
      left: 0,
      right: 7,
    },
    1: {
      left: -1,
      right: 7,
    },
    2: {
      left: 0,
      right: 7,
    },
    3: {
      left: 0,
      right: 8,
    },
  },
  5: {
    0: {
      left: 0,
      right: 7,
    },
    1: {
      left: -1,
      right: 7,
    },
    2: {
      left: 0,
      right: 7,
    },
    3: {
      left: 0,
      right: 8,
    },
  },
  6: {
    0: {
      left: 0,
      right: 7,
    },
    1: {
      left: -1,
      right: 7,
    },
    2: {
      left: 0,
      right: 7,
    },
    3: {
      left: 0,
      right: 8,
    },
  },
};

const FALLING = -100;

const getBlockWidth = (block, rot) => {
  let max = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (BLOCKS[block][rot][i][j]) {
        max = Math.max(max, j + 1);
      }
    }
  }
  return max;
};

// const copyMatrix = (matrix) => { // already defined in jstris
//   let arr = [];
//   matrix.forEach((e) => {
//     arr.push(e.slice());
//   });
//   return arr;
// };

const trim = (matrix) => {
  for (let i = 0; i < matrix.length; i++) {
    let isTrimable = true;
    let tmp = matrix[i];
    for (let i = 0; i < tmp.length && isTrimable; i++) {
      if (!tmp[i]) isTrimable = false;
    }
    if (isTrimable) {
      matrix.splice(i--, 1);
      matrix.unshift(tmp.map(() => 0));
    }
  }
  return matrix;
};

const fall = (ori) => {
  let modified = copyMatrix(ori);
  while (true) {
    let tmp = copyMatrix(modified);
    for (let i = tmp.length - 1; i >= 0; i--) {
      for (let j = 0; j < tmp[i].length; j++) {
        if (tmp[i][j] === FALLING) {
          if (i === tmp.length - 1) {
            return modified;
          }
          if (!tmp[i + 1][j]) {
            tmp[i + 1][j] = FALLING;
            tmp[i][j] = 0;
          } else {
            return modified;
          }
        }
      }
    }
    modified = tmp;
  }
};

const sim = (matrix, block, rot, x) => {
  if (x > 10 - getBlockWidth(block, rot)) {
    return false;
  }
  let m = copyMatrix(matrix);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (BLOCKS[block][rot][i][j]) {
        m[i][j + x] = FALLING;
      }
    }
  }

  m = fall(m);
  m = trim(m);

  return m;
};

const calc = (matrix) => {
  let results = [];
  for (let j = 0; j < matrix[0].length; j++) {
    let b = false,
      cnt = 0,
      hight = 0;
    for (let i = 0; i < matrix.length; i++) {
      if (matrix[i][j]) {
        if (!b) {
          b = true;
          hight = matrix.length - i;
        }
      } else if (b) {
        cnt++;
      }
    }
    results.push({ hight, cnt });
  }

  let score = 0;
  results.forEach((e) => {
    score += e.hight * e.hight * 0.7 + e.cnt * e.cnt * 0.3;
  });

  return score;
};

const bf = (matrix, blocks) => {
  let min = 2e9,
    block = 0,
    rot = 0,
    x = 0;
  blocks.forEach((i) => {
    for (let j = 0; j < BLOCKS[i].length; j++) {
      for (let k = 0; k < 10; k++) {
        let tmp = sim(matrix, i, j, k);
        if (!tmp) break;
        let score = calc(tmp);
        if (min > score) {
          min = score;
          block = i;
          rot = j;
          x = k;
        }
      }
    }
  });
  return { block, rot, x };
};

const rotate = async (rot) => {
  await sleep(CONFIG.DELAYS.ROTATE * Math.random());
  if (!CONFIG.ROTATE_HUMANIZE || Math.random() < 0.7) {
    switch (rot) {
      case 1:
        await keyInput(KEY.UP_ARROW);
        break;
      case 2:
        await keyInput(KEY.A);
        break;
      case 3:
        await keyInput(KEY.Z);
        break;
    }
  } else {
    while (rot--) {
      await keyInput(KEY.UP_ARROW);
    }
  }
};
const move = async (block, rot, x) => {
  if (CONFIG.ULTRA_HUMANIZE) {
    if (x <= 1) {
      await keyInput(
        KEY.LEFT_ARROW,
        GAME.Settings.DAS +
          GAME.Settings.ARR *
            (BLOCKS_POS[block][rot].left - GAME.activeBlock.pos.x - 1)
      );
    }
    if (x >= BLOCKS_POS[block][rot].right - BLOCKS_POS[block][rot].left - 1) {
      await keyInput(
        KEY.RIGHT_ARROW,
        GAME.Settings.DAS +
          GAME.Settings.ARR *
            (BLOCKS_POS[block][rot].right - GAME.activeBlock.pos.x - 1)
      );
    }
  }

  x = x + BLOCKS_POS[block][rot].left - GAME.activeBlock.pos.x;
  while (x > 0) {
    await keyInput(KEY.RIGHT_ARROW);
    x--;
  }
  while (x < 0) {
    await keyInput(KEY.LEFT_ARROW);
    x++;
  }
};

const auto = async () => {
  while (GAME.play) {
    let firstBlock = GAME.activeBlock.id,
      secondBLock = GAME.blockInHold?.id ?? GAME.queue[0].id;
    let { block, rot, x } = bf(GAME.matrix, [firstBlock, secondBLock]);
    if (block !== firstBlock) {
      await keyInput(KEY.C);
    }

    await Promise.all([rotate(rot), move(block, rot, x)]);

    await keyInput(KEY.SPACE);
    await sleep(
      CONFIG.DELAYS.DROP_MIN +
        (CONFIG.DELAYS.DROP_MAX - CONFIG.DELAYS.DROP_MAX) * Math.random()
    );
  }
};
