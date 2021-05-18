import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import './App.css';

// 해야할 것
// score 구현
// gameover시 알림
// 화살표 이동 및 가능하다면 스와이프 이동 구현
// retry 버튼
// 파일 쪼개기
// 숫자 색상들
// moveleft만 구현하고 나머지는 moveleft를 이용해서 돌리면서 구현하기(이때 배열 deepcopy)
const Board = styled.div`
  background: #ad9d8f;
  width: max-content;
  margin: auto;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
`;

const Block = styled.div`
  height: 80px;
  width: 80px;
  background: lightgray;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45px;
  font-weight: 800;
  color: white;
`;

function App() {
  // 버튼 한번을 누르면 전체가 바뀌기 때문에 그냥 하나의 state에서 grid를 관리
  // 또한 나중에 게임을 하면서 이동했는지 안했는지 비교할때 전체가 필요하기 때문에
  // 판 전체를 관리한다
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    initGrid();
  }, []);

  const initGrid = () => {
    let newGrid: number[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    // 처음에 2번 넣는다.
    newGrid = pushNumber(pushNumber(newGrid));
    setGrid(newGrid);
  };

  // 게임판에서 비어있는 공간을 찾는다.
  const getBlankGrid = (pushGrid: number[][]) => {
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

  // 게임판에 랜덤하게 넣고 반환.
  // 게임판이 꽉 찼다면 그냥 그대로 반환
  const pushNumber = (pushGrid: number[][]) => {
    const blankGrid: number[][] = getBlankGrid(pushGrid);
    const randomPush: number[] =
      blankGrid[Math.floor(Math.random() * blankGrid.length)];
    const pushNumber = Math.random() > 0.5 ? 2 : 4;

    pushGrid[randomPush[0]][randomPush[1]] = pushNumber;
    return pushGrid;
  };

  // 이부분 코드가 너무 중복되니 나중에 push left를 만들고
  // 배열을 회전시켜서 left, right, up, down을 하는 방식으로 구현하자.
  // 또한 지금은 각 이동을 하드코딩으로 구현했는데 이러면 나중에 판의 크기를 변경해는 것이
  // 불가능할 것. 추후에 반복문으로 돌아갈 수 있도록 만들자.

  // 왼쪽으로 이동시키고, 값을 더한 Grid를 return.
  const moveLeft = (inputGrid: number[][]) => {
    let moveGrid: number[][] = [];

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
      moveGrid.push(row);
    }

    // 같은 숫자가 있다면 결합하기
    // [4,4,4,4], [4,2,2,0], [4,4,2,0], [4,2,4,4] 의 4가지 경우가 존재.
    // 0의 경우는 신경쓰지 않아도 된다. 어차피 위에서 다 한쪽으로 몰아놔서 신경x
    for (let i = 0; i < moveGrid.length; i++) {
      // [4,4,4,4] 의 경우. 2개씩 짝을 이루어서 합쳐지는 것이 가능할때
      if (
        moveGrid[i][0] === moveGrid[i][1] &&
        moveGrid[i][2] === moveGrid[i][3]
      ) {
        moveGrid[i][0] = moveGrid[i][0] * 2;
        moveGrid[i][1] = moveGrid[i][2] * 2;
        moveGrid[i][2] = 0;
        moveGrid[i][3] = 0;
      }
      // [4,4,2,0] [4,4,0,0], [4,4,2,4] 의 경우
      else if (moveGrid[i][0] === moveGrid[i][1]) {
        moveGrid[i][0] = moveGrid[i][0] * 2;
        moveGrid[i][1] = moveGrid[i][2];
        moveGrid[i][2] = moveGrid[i][3];
        moveGrid[i][3] = 0;
      }
      // [4,2,2,0], [4,2,2,4]
      else if (moveGrid[i][1] === moveGrid[i][2]) {
        moveGrid[i][1] = moveGrid[i][1] * 2;
        moveGrid[i][2] = moveGrid[i][3];
        moveGrid[i][3] = 0;
      }
      // [4,2,4,4] 의 경우
      else if (moveGrid[i][2] === moveGrid[i][3]) {
        moveGrid[i][2] = moveGrid[i][2] * 2;
        moveGrid[i][3] = 0;
      }
    }

    return moveGrid;
  };

  // 오른쪽으로 이동시키고, 값을 더한 Grid를 return.
  const moveRight = (inputGrid: number[][]) => {
    let moveGrid: number[][] = [];

    // 한쪽으로 몰아넣기
    // 비어있는 것(0)이 있다면 row에 넣지 않고, 나머지는 넣는다.
    // 이때 0의 개수를 count하고 나중에 그만큼 row에 push
    for (let i = 0; i < inputGrid.length; i++) {
      let row = [];
      let empty_count = 0;
      for (let j = inputGrid[i].length - 1; j >= 0; j--) {
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
      let row_reversed = row.reverse();
      moveGrid.push(row_reversed);
    }

    // 같은 숫자가 있다면 결합하기
    // 3가지 경우가 존재
    // [4,4,4,4], [0,2,4,4], [0,4,4,2], [4,4,2,4] 의 경우가 존재.
    // 0의 경우는 신경쓰지 않아도 된다. 어차피 위에서 다 한쪽으로 몰아놔서 신경x
    for (let i = 0; i < moveGrid.length; i++) {
      // [4,4,4,4] 의 경우. 2개씩 짝을 이루어서 합쳐지는 것이 가능할때
      if (
        moveGrid[i][3] === moveGrid[i][2] &&
        moveGrid[i][1] === moveGrid[i][0]
      ) {
        moveGrid[i][3] = moveGrid[i][3] * 2;
        moveGrid[i][2] = moveGrid[i][1] * 2;
        moveGrid[i][1] = 0;
        moveGrid[i][0] = 0;
      }
      // [0,4,2,2], [0,0,2,2], [4,2,4,4] 의 경우
      else if (moveGrid[i][3] === moveGrid[i][2]) {
        moveGrid[i][3] = moveGrid[i][3] * 2;
        moveGrid[i][2] = moveGrid[i][1];
        moveGrid[i][1] = moveGrid[i][0];
        moveGrid[i][0] = 0;
      }
      // [0,2,2,4], [4,2,2,4] 의 경우
      else if (moveGrid[i][2] === moveGrid[i][1]) {
        moveGrid[i][2] = moveGrid[i][2] * 2;
        moveGrid[i][1] = moveGrid[i][0];
        moveGrid[i][0] = 0;
      }
      // [4,4,2,4] 의 경우
      else if (moveGrid[i][1] === moveGrid[i][0]) {
        moveGrid[i][1] = moveGrid[i][1] * 2;
        moveGrid[i][0] = 0;
      }
    }
    return moveGrid;
  };

  // 시계방향으로 회전시키고, moveRight 한다음에 다시 반시계 회전시키면 된다.
  const moveUp = (inputGrid: number[][]) => {
    let moveGrid: number[][] = [];

    // 배열을 시계방향으로 회전시킨다.
    inputGrid = reverse(transpose(inputGrid));
    // 한쪽으로 몰아넣기
    // 비어있는 것(0)이 있다면 row에 넣지 않고, 나머지는 넣는다.
    // 이때 0의 개수를 count하고 나중에 그만큼 row에 push
    for (let i = 0; i < inputGrid.length; i++) {
      let row = [];
      let empty_count = 0;
      for (let j = inputGrid[i].length - 1; j >= 0; j--) {
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
      let row_reversed = row.reverse();
      moveGrid.push(row_reversed);
    }

    // 같은 숫자가 있다면 결합하기
    // 3가지 경우가 존재
    // [4,4,4,4], [0,2,4,4], [0,4,4,2], [4,4,2,4] 의 경우가 존재.
    // 0의 경우는 신경쓰지 않아도 된다. 어차피 위에서 다 한쪽으로 몰아놔서 신경x
    for (let i = 0; i < moveGrid.length; i++) {
      // [4,4,4,4] 의 경우. 2개씩 짝을 이루어서 합쳐지는 것이 가능할때
      if (
        moveGrid[i][3] === moveGrid[i][2] &&
        moveGrid[i][1] === moveGrid[i][0]
      ) {
        moveGrid[i][3] = moveGrid[i][3] * 2;
        moveGrid[i][2] = moveGrid[i][1] * 2;
        moveGrid[i][1] = 0;
        moveGrid[i][0] = 0;
      }
      // [0,4,2,2], [0,0,2,2], [4,2,4,4] 의 경우
      else if (moveGrid[i][3] === moveGrid[i][2]) {
        moveGrid[i][3] = moveGrid[i][3] * 2;
        moveGrid[i][2] = moveGrid[i][1];
        moveGrid[i][1] = moveGrid[i][0];
        moveGrid[i][0] = 0;
      }
      // [0,2,2,4], [4,2,2,4] 의 경우
      else if (moveGrid[i][2] === moveGrid[i][1]) {
        moveGrid[i][2] = moveGrid[i][2] * 2;
        moveGrid[i][1] = moveGrid[i][0];
        moveGrid[i][0] = 0;
      }
      // [4,4,2,4] 의 경우
      else if (moveGrid[i][1] === moveGrid[i][0]) {
        moveGrid[i][1] = moveGrid[i][1] * 2;
        moveGrid[i][0] = 0;
      }
    }

    inputGrid = transpose(reverse(inputGrid));
    moveGrid = transpose(reverse(moveGrid));
    return moveGrid;
  };

  const moveDown = (inputGrid: number[][]) => {
    let moveGrid: number[][] = [];

    // 배열을 시계방향으로 회전시킨다.
    inputGrid = reverse(transpose(inputGrid));
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
      moveGrid.push(row);
    }

    // 같은 숫자가 있다면 결합하기
    // [4,4,4,4], [4,2,2,0], [4,4,2,0], [4,2,4,4] 의 4가지 경우가 존재.
    // 0의 경우는 신경쓰지 않아도 된다. 어차피 위에서 다 한쪽으로 몰아놔서 신경x
    for (let i = 0; i < moveGrid.length; i++) {
      // [4,4,4,4] 의 경우. 2개씩 짝을 이루어서 합쳐지는 것이 가능할때
      if (
        moveGrid[i][0] === moveGrid[i][1] &&
        moveGrid[i][2] === moveGrid[i][3]
      ) {
        moveGrid[i][0] = moveGrid[i][0] * 2;
        moveGrid[i][1] = moveGrid[i][2] * 2;
        moveGrid[i][2] = 0;
        moveGrid[i][3] = 0;
      }
      // [4,4,2,0] [4,4,0,0], [4,4,2,4] 의 경우
      else if (moveGrid[i][0] === moveGrid[i][1]) {
        moveGrid[i][0] = moveGrid[i][0] * 2;
        moveGrid[i][1] = moveGrid[i][2];
        moveGrid[i][2] = moveGrid[i][3];
        moveGrid[i][3] = 0;
      }
      // [4,2,2,0], [4,2,2,4]
      else if (moveGrid[i][1] === moveGrid[i][2]) {
        moveGrid[i][1] = moveGrid[i][1] * 2;
        moveGrid[i][2] = moveGrid[i][3];
        moveGrid[i][3] = 0;
      }
      // [4,2,4,4] 의 경우
      else if (moveGrid[i][2] === moveGrid[i][3]) {
        moveGrid[i][2] = moveGrid[i][2] * 2;
        moveGrid[i][3] = 0;
      }
    }
    inputGrid = transpose(reverse(inputGrid));
    moveGrid = transpose(reverse(moveGrid));
    return moveGrid;
  };

  // 배열을 대각선으로 접는다.
  const transpose = (matrix: number[][]) => {
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
  const reverse = (matrix: number[][]) => {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i].reverse();
    }
    return matrix;
  };

  // 오른쪽 왼쪽 위 아래 모두 이동시켜보았을때 이전의 gird랑 같으면 더이상 움직일 수 없다는 것
  const isGameOver = (inputGrid: number[][]) => {
    if (JSON.stringify(moveLeft(inputGrid)) !== JSON.stringify(inputGrid)) {
      return false;
    }
    if (JSON.stringify(moveRight(inputGrid)) !== JSON.stringify(inputGrid)) {
      return false;
    }
    if (JSON.stringify(moveUp(inputGrid)) !== JSON.stringify(inputGrid)) {
      return false;
    }
    if (JSON.stringify(moveDown(inputGrid)) !== JSON.stringify(inputGrid)) {
      return false;
    }
    return true;
  };

  const playGame = (where: string) => {
    if (gameOver) {
      alert('Game Over');
    } else {
      switch (where) {
        case 'left':
          const moveLeftGrid = moveLeft(grid);
          if (JSON.stringify(grid) !== JSON.stringify(moveLeftGrid)) {
            // 여기에 들어와있다는 것은 반드시 빈칸이 존재한다는 것을 의미한다.
            const newLeftGrid = pushNumber(moveLeftGrid);

            if (isGameOver(newLeftGrid)) {
              setGameOver(true);
            }
            setGrid(newLeftGrid);
          }
          break;
        case 'right':
          const moveRightGrid = moveRight(grid);
          if (JSON.stringify(grid) !== JSON.stringify(moveRightGrid)) {
            // 여기에 들어와있다는 것은 반드시 빈칸이 존재한다는 것을 의미한다.
            const newRightGrid = pushNumber(moveRightGrid);

            if (isGameOver(newRightGrid)) {
              setGameOver(true);
            }
            setGrid(newRightGrid);
          }
          break;
        case 'up':
          const moveUpGrid = moveUp(grid);
          if (JSON.stringify(grid) !== JSON.stringify(moveUpGrid)) {
            // 여기에 들어와있다는 것은 반드시 빈칸이 존재한다는 것을 의미한다.
            const newUpGrid = pushNumber(moveUpGrid);

            if (isGameOver(newUpGrid)) {
              setGameOver(true);
            }
            setGrid(newUpGrid);
          }
          break;
        case 'down':
          const moveDownGrid = moveDown(grid);
          if (JSON.stringify(grid) !== JSON.stringify(moveDownGrid)) {
            // 여기에 들어와있다는 것은 반드시 빈칸이 존재한다는 것을 의미한다.
            const newDownGrid = pushNumber(moveDownGrid);

            if (isGameOver(newDownGrid)) {
              setGameOver(true);
            }
            setGrid(newDownGrid);
          }
          break;
        default:
          break;
      }
    }
  };
  return (
    <>
      <Board>
        {grid.map((row, rowIndex) => (
          <div style={{ display: 'flex' }} key={`rowIndex-${rowIndex}`}>
            {row.map((item, itemIndex) => (
              <Block
                key={`itemIndex-${itemIndex}`}
                style={{
                  background: item === 2 || item === 4 ? `#645B52` : `#F7F4EF`,
                }}
              >
                {item}
              </Block>
            ))}
          </div>
        ))}
        <div onClick={() => playGame('left')}>moveleft-test</div>
        <div onClick={() => playGame('right')}>moveRight-test</div>
        <div onClick={() => playGame('up')}>moveUp-test</div>
        <div onClick={() => playGame('down')}>moveDown-test</div>
      </Board>
      <p>{gameOver ? 'Game Over!! push retry' : ''}</p>
    </>
  );
}

export default App;
