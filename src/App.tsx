import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import './App.css';
import { findAllByPlaceholderText } from '@testing-library/dom';

// 어떤 방향으로 밀때 배열의 가장 왼쪽 s, 그다음 f
// [0 , 0 ,0 ,0]
//  s   f
// 1) number[s] == 0 number[f] == 0  -> f++
// 2) number[s] != 0 number[f] == 0 => f++
// 3) number[s] == 0 number[f] != 0 ->  number[s] = number[f] , s++ , f=s+1
// 3) number[s] != 0 number[f] !=0 && number[s] == number[f] -> number[s] = number[s]+number[f], s++, f=s+1

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
  return (
    <Board>
      {grid.map((row, rowIndex) => (
        <div style={{ display: 'flex' }} key={`rowIndex-${rowIndex}`}>
          {row.map((item, itemIndex) => (
            <Block
              key={`itemIndex-${itemIndex}`}
              style={{
                color: item === 2 || item === 4 ? '#645B52' : '#F7F4EF',
              }}
            >
              {item}
            </Block>
          ))}
        </div>
      ))}
    </Board>
  );
}

export default App;
