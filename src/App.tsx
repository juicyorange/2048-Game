import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import './App.css';
import { reverse } from 'dns';

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

  // 움직일때마다 추가되는 숫자 반환. 2 또는 4
  const getPushNumber = () => {
    return Math.random() > 0.5 ? 2 : 4;
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
  const pushNumber = (pushGrid: number[][]) => {
    const blankGrid: number[][] = getBlankGrid(pushGrid);
    const randomPush: number[] =
      blankGrid[Math.floor(Math.random() * blankGrid.length)];
    const pushNumber = getPushNumber();

    pushGrid[randomPush[0]][randomPush[1]] = pushNumber;
    return pushGrid;
  };

  // 왼쪽으로 이동시키고, 값을 더한 Grid를 return. 내부에서 setGrid 사용하지 않는다.
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

    // test
    setGrid(pushNumber(moveGrid));
  };

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
    // test
    setGrid(pushNumber(moveGrid));
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
    // test
    moveGrid = transpose(reverse(moveGrid));
    setGrid(pushNumber(moveGrid));
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
    // test
    moveGrid = transpose(reverse(moveGrid));
    setGrid(pushNumber(moveGrid));
  };

  return (
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
      <div onClick={() => moveLeft(grid)}>moveleft-test</div>
      <div onClick={() => moveRight(grid)}>moveRight-test</div>
      <div onClick={() => moveUp(grid)}>moveUp-test</div>
      <div onClick={() => moveDown(grid)}>moveDown-test</div>
    </Board>
  );
}

export default App;
