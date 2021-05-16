import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import './App.css';

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
  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  return (
    <Board>
      {grid.map((row, rowIndex) => (
        <div style={{ display: 'flex' }} key={`rowIndex-${rowIndex}`}>
          {row.map((item, itemIndex) => (
            <Block key={`itemIndex-${itemIndex}`}>{item}</Block>
          ))}
        </div>
      ))}
    </Board>
  );
}

export default App;
