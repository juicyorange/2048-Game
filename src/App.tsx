import styled from 'styled-components';
import * as _ from 'lodash';
import React, { useState, useEffect } from 'react';
import './App.css';
import Swipe from 'react-easy-swipe';

// 해야할 것
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
  padding: 5px;
`;

const GameName = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  margin-bottom : 3px
  padding-top: 7px;
  padding-botton: 7px;
  padding-left: 10px;
  padding-right: 10px;
  background: #846f5b;
  color: #f8f5f0;
  width: 50px;
  font-weight: 900;
  margin-left: 5px;
  margin-bottom: auto;
`;

const Retry = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #846f5b;
  color: #f8f5f0;
  width: 50px;
  border-radius: 7px;
  font-weight: 900;
  margin-left: auto;
  margin-bottom: auto;
  cursor: pointer;
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
  const [score, setScore] = useState<number>(0);
  const [best, setBest] = useState<number>(0);
  useEffect(() => {
    initGrid();
    /*
    const body = document.querySelector('body');
    (() => {
      body?.addEventListener('keydown', handleKeyDown);
      console.log(handleKeyDown);
    })();
    return () => {
      body?.removeEventListener('keydown', handleKeyDown);
    };
    */
  }, []);

  let myRef: any = React.createRef();

  const initGrid = () => {
    let newGrid: number[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    if (gameOver === true) {
      setGameOver(false);
    }
    setScore(0);

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

  const leftPush = (inputGrid: number[][]) => {
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
  const moveLeft = (inputGrid: number[][]) => {
    let moveGrid: number[][] = _.cloneDeep(inputGrid);
    const { returnGrid, addScore } = leftPush(moveGrid);
    const moveLeftGrid = _.cloneDeep(returnGrid);
    return { moveLeftGrid, addScore };
  };

  // 오른쪽으로 이동시키고, 값을 더한 Grid를 return.
  const moveRight = (inputGrid: number[][]) => {
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
  const moveUp = (inputGrid: number[][]) => {
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

  const moveDown = (inputGrid: number[][]) => {
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
    if (
      JSON.stringify(moveLeft(inputGrid).moveLeftGrid) !==
      JSON.stringify(inputGrid)
    ) {
      return false;
    }
    if (
      JSON.stringify(moveRight(inputGrid).moveRightGrid) !==
      JSON.stringify(inputGrid)
    ) {
      return false;
    }
    if (
      JSON.stringify(moveUp(inputGrid).moveUpGrid) !== JSON.stringify(inputGrid)
    ) {
      return false;
    }
    if (
      JSON.stringify(moveDown(inputGrid).moveDownGrid) !==
      JSON.stringify(inputGrid)
    ) {
      return false;
    }

    return true;
  };

  const playGame = (where: string) => {
    if (gameOver === false) {
      switch (where) {
        case 'left':
          const moveLeftGrid = moveLeft(grid);
          if (
            JSON.stringify(grid) !== JSON.stringify(moveLeftGrid.moveLeftGrid)
          ) {
            // 여기에 들어와있다는 것은 반드시 빈칸이 존재한다는 것을 의미한다.
            const newLeftGrid = pushNumber(moveLeftGrid.moveLeftGrid);

            if (isGameOver(newLeftGrid)) {
              setGameOver(true);
              if (score > best) {
                setBest(score);
              }
            }
            setScore((prev) => prev + moveLeftGrid.addScore);
            setGrid(newLeftGrid);
          }
          break;
        case 'right':
          const moveRightGrid = moveRight(grid);
          if (
            JSON.stringify(grid) !== JSON.stringify(moveRightGrid.moveRightGrid)
          ) {
            // 여기에 들어와있다는 것은 반드시 빈칸이 존재한다는 것을 의미한다.
            const newRightGrid = pushNumber(moveRightGrid.moveRightGrid);

            if (isGameOver(newRightGrid)) {
              if (score > best) {
                setBest(score);
              }
              setGameOver(true);
            }
            setScore((prev) => prev + moveRightGrid.addScore);
            setGrid(newRightGrid);
          }
          break;
        case 'up':
          const moveUpGrid = moveUp(grid);
          if (JSON.stringify(grid) !== JSON.stringify(moveUpGrid.moveUpGrid)) {
            // 여기에 들어와있다는 것은 반드시 빈칸이 존재한다는 것을 의미한다.
            const newUpGrid = pushNumber(moveUpGrid.moveUpGrid);

            if (isGameOver(newUpGrid)) {
              setGameOver(true);
              if (score > best) {
                setBest(score);
              }
            }
            setScore((prev) => prev + moveUpGrid.addScore);
            setGrid(newUpGrid);
          }
          break;
        case 'down':
          const moveDownGrid = moveDown(grid);
          if (
            JSON.stringify(grid) !== JSON.stringify(moveDownGrid.moveDownGrid)
          ) {
            // 여기에 들어와있다는 것은 반드시 빈칸이 존재한다는 것을 의미한다.
            const newDownGrid = pushNumber(moveDownGrid.moveDownGrid);

            if (isGameOver(newDownGrid)) {
              setGameOver(true);
              if (score > best) {
                setBest(score);
              }
            }
            setScore((prev) => prev + moveDownGrid.addScore);
            setGrid(newDownGrid);
          }
          break;
        default:
          break;
      }
    }
  };

  const handleKeyDown = (e: any) => {
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;
    console.log(e);
    if (e.keyCode === left) {
      playGame('left');
    } else if (e.keyCode === right) {
      playGame('right');
    } else if (e.keyCode === up) {
      playGame('up');
    } else if (e.keyCode === down) {
      playGame('down');
    }
  };

  const onSwipeMove = (position: any) => {
    console.log(position.x);
    console.log(position.y);
    if (Math.abs(position.x) > Math.abs(position.y)) {
      if (position.x > 100) {
        playGame('right');
      } else if (position.x < -100) {
        playGame('left');
      }
    } else {
      if (position.y < -100) {
        playGame('up');
      } else if (position.y > 100) {
        playGame('down');
      }
    }
  };
  return (
    <>
      <Board onKeyDown={handleKeyDown} tabIndex={1}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <GameName>MY 2048</GameName>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Score>
              score<br></br>
              {score}
            </Score>
            <Score>
              best<br></br>
              {best}
            </Score>
          </div>
        </div>
        <Retry onClick={() => initGrid()}>retry</Retry>
        <Swipe innerRef={(ref) => (myRef = ref)} onSwipeMove={onSwipeMove}>
          {grid.map((row, rowIndex) => (
            <div style={{ display: 'flex' }} key={`rowIndex-${rowIndex}`}>
              {row.map((item: any, itemIndex) => (
                <Block
                  key={`itemIndex-${itemIndex}`}
                  color={item}
                  style={{
                    background: getColors(item),
                    color: item === 2 || item === 4 ? `#645B52` : `#F7F4EF`,
                  }}
                >
                  {item ? item : ''}
                </Block>
              ))}
            </div>
          ))}
        </Swipe>
      </Board>
      <p>{gameOver ? 'Game Over!! push retry' : ''}</p>
    </>
  );
}

const getColors = (num: any) => {
  switch (num) {
    case 2:
      return '#EDE4DA';
    case 4:
      return '#EEE1C9';
    case 8:
      return '#F3B279';
    case 16:
      return '#F79563';
    case 32:
      return '#F2654F';
    case 64:
      return '#F75F3B';
    case 128:
      return '#EDD073';
    case 256:
      return '#EECC61';
    case 512:
      return '#EDC950';
    case 1024:
      return '#E8BB31';
    case 2048:
      return '#E7B723';
    default:
      return '#C2B3A3';
  }
};

export default App;
