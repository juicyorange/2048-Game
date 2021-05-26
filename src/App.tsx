import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import './App.css';
import Swipe from 'react-easy-swipe';
import Block from './components/Block';
import Score from './components/Score';
import { pushNumber, moveLeft, moveRight, moveDown, moveUp } from './move';

// 해야할 것
const Board = styled.div`
  background: #ad9d8f;
  width: max-content;
  margin: auto;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
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

const App: React.FC = () => {
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
  const [swipe, setSwipe] = useState<boolean>(false);

  useEffect(() => {
    let newGrid: number[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    setScore(0);
    newGrid = pushNumber(pushNumber(newGrid));
    setGrid(newGrid);
  }, []);

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
    setSwipe(false);
    // 처음에 2번 넣는다.
    newGrid = pushNumber(pushNumber(newGrid));
    setGrid(newGrid);
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

  const swipeMove = (position: any) => {
    if (swipe === false) {
      setSwipe(true);
      onSwipeMove(position);
      setTimeout(() => setSwipe(false), 200);
    }
  };
  const onSwipeMove = (position: any) => {
    if (Math.abs(position.x) > Math.abs(position.y)) {
      if (position.x > 0) {
        playGame('right');
      } else if (position.x < 0) {
        playGame('left');
      }
    } else {
      if (position.y < 0) {
        playGame('up');
      } else if (position.y > 0) {
        playGame('down');
      }
    }
  };
  return (
    <>
      <Board onKeyDown={handleKeyDown} tabIndex={1}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '50px', fontWeight: 'bold', margin: '0' }}>
            MY 2048
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Score name="score" score={score} />
            <Score name="best" score={best} />
          </div>
        </div>
        <Retry onClick={() => initGrid()}>retry</Retry>
        <Swipe innerRef={(ref) => ref} onSwipeMove={swipeMove}>
          {grid.map((row, rowIndex) => (
            <div style={{ display: 'flex' }} key={`rowIndex-${rowIndex}`}>
              {row.map((item: any, itemIndex) => (
                <Block key={`itemIndex-${itemIndex}`} item={item} />
              ))}
            </div>
          ))}
        </Swipe>
      </Board>
      <p>{gameOver ? 'Game Over!! push retry' : ''}</p>
    </>
  );
};
export default App;
