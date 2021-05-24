import * as _ from 'lodash';
// 게임판에서 비어있는 공간을 찾는다.
export const getBlankGrid = (pushGrid: number[][]) => {
  const blankGrid: number[][] = [];

  for (let i = 0; i < pushGrid.length; i++) {
    for (let j = 0; j < pushGrid[i].length; j++) {
      if (pushGrid[i][j] === 0) {
        blankGrid.push([i, j]);
      }
    }
  }
  return blankGrid;
};

// 게임판이 꽉 찼다면 그냥 그대로 반환
export const pushNumber = (pushGrid: number[][]) => {
  const blankGrid: number[][] = getBlankGrid(pushGrid);
  const randomPush: number[] =
    blankGrid[Math.floor(Math.random() * blankGrid.length)];
  const pushNumber = Math.random() > 0.5 ? 2 : 4;

  pushGrid[randomPush[0]][randomPush[1]] = pushNumber;
  return pushGrid;
};

export const leftPush = (inputGrid: number[][]) => {
  let returnGrid: number[][] = [];
  let addScore: number = 0;
  // 한쪽으로 몰아넣기
  // 비어있는 것(0)이 있다면 row에 넣지 않고, 나머지는 넣는다.
  // 이때 0의 개수를 count하고 나중에 그만큼 row에 push
  for (let i = 0; i < inputGrid.length; i++) {
    let row = [];
    let empty_count = 0;
    for (let j = 0; j < inputGrid[i].length; j++) {
      let nowNumber = inputGrid[i][j];
      if (nowNumber !== 0) {
        row.push(nowNumber);
      } else {
        empty_count++;
      }
    }
    // 0이 있던만큼 다시 0을 넣어준다.
    for (let j = 0; j < empty_count; j++) {
      row.push(0);
    }
    returnGrid.push(row);
  }

  // 같은 숫자가 있다면 결합하기
  // [4,4,4,4], [4,2,2,0], [4,4,2,0], [4,2,4,4] 의 4가지 경우가 존재.
  // 0의 경우는 신경쓰지 않아도 된다. 어차피 위에서 다 한쪽으로 몰아놔서 신경x
  for (let i = 0; i < returnGrid.length; i++) {
    // [4,4,4,4] 의 경우. 2개씩 짝을 이루어서 합쳐지는 것이 가능할때
    if (
      returnGrid[i][0] === returnGrid[i][1] &&
      returnGrid[i][2] === returnGrid[i][3]
    ) {
      returnGrid[i][0] = returnGrid[i][0] * 2;
      returnGrid[i][1] = returnGrid[i][2] * 2;
      returnGrid[i][2] = 0;
      returnGrid[i][3] = 0;
      addScore = addScore + returnGrid[i][0] + returnGrid[i][1];
    }
    // [4,4,2,0] [4,4,0,0], [4,4,2,4] 의 경우
    else if (returnGrid[i][0] === returnGrid[i][1]) {
      returnGrid[i][0] = returnGrid[i][0] * 2;
      returnGrid[i][1] = returnGrid[i][2];
      returnGrid[i][2] = returnGrid[i][3];
      returnGrid[i][3] = 0;
      addScore = addScore + returnGrid[i][0];
    }
    // [4,2,2,0], [4,2,2,4]
    else if (returnGrid[i][1] === returnGrid[i][2]) {
      returnGrid[i][1] = returnGrid[i][1] * 2;
      returnGrid[i][2] = returnGrid[i][3];
      returnGrid[i][3] = 0;
      addScore = addScore + returnGrid[i][1];
    }
    // [4,2,4,4] 의 경우
    else if (returnGrid[i][2] === returnGrid[i][3]) {
      returnGrid[i][2] = returnGrid[i][2] * 2;
      returnGrid[i][3] = 0;
      addScore = addScore + returnGrid[i][2];
    }
  }

  return { returnGrid, addScore };
};
// 왼쪽으로 이동시키고, 값을 더한 Grid를 return.
export const moveLeft = (inputGrid: number[][]) => {
  let moveGrid: number[][] = _.cloneDeep(inputGrid);
  const { returnGrid, addScore } = leftPush(moveGrid);
  const moveLeftGrid = _.cloneDeep(returnGrid);
  return { moveLeftGrid, addScore };
};

// 오른쪽으로 이동시키고, 값을 더한 Grid를 return.
export const moveRight = (inputGrid: number[][]) => {
  let moveGrid: number[][] = _.cloneDeep(inputGrid);
  // 배열을 뒤집어준다.
  moveGrid = reverse(moveGrid);
  // 왼쪽으로 몰아주는 함수
  const { returnGrid, addScore } = leftPush(moveGrid);
  moveGrid = _.cloneDeep(returnGrid);
  // 배열을 다시 뒤집는다.
  const moveRightGrid = reverse(moveGrid);
  return { moveRightGrid, addScore };
};

// 시계방향으로 회전시키고, moveRight 한다음에 다시 반시계 회전시키면 된다.
export const moveUp = (inputGrid: number[][]) => {
  let moveGrid: number[][] = _.cloneDeep(inputGrid);
  // 배열을 반시계방향으로 회전시킨다.
  moveGrid = transpose(reverse(moveGrid));
  // 왼쪽으로 몰아주는 함수
  const { returnGrid, addScore } = leftPush(moveGrid);
  moveGrid = _.cloneDeep(returnGrid);
  // 배열을 다시 시계방향으로 회전시킨다.
  const moveUpGrid = reverse(transpose(moveGrid));
  return { moveUpGrid, addScore };
};

export const moveDown = (inputGrid: number[][]) => {
  let moveGrid: number[][] = _.cloneDeep(inputGrid);
  // 배열을 시계방향으로 회전시킨다.
  moveGrid = reverse(transpose(moveGrid));
  // 왼쪽으로 몰아주는 함수
  const { returnGrid, addScore } = leftPush(moveGrid);
  moveGrid = _.cloneDeep(returnGrid);
  // 배열을 다시 반시계방향으로 회전시킨다.
  const moveDownGrid = transpose(reverse(moveGrid));
  return { moveDownGrid, addScore };
};

// 배열을 대각선으로 접는다.
export const transpose = (matrix: number[][]) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < row; column++) {
      let temp = matrix[row][column];
      matrix[row][column] = matrix[column][row];
      matrix[column][row] = temp;
    }
  }
  return matrix;
};
// 배열 요소들 반대로
export const reverse = (matrix: number[][]) => {
  for (let i = 0; i < matrix.length; i++) {
    matrix[i].reverse();
  }
  return matrix;
};
