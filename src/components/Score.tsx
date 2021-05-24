import styled from 'styled-components';

const GameScore = styled.div`
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

interface IScoreProps {
  score: number;
  name: string;
}

const Score: React.FC<IScoreProps> = ({ name, score }) => {
  return (
    <GameScore>
      {name}
      <br></br>
      {score}
    </GameScore>
  );
};

export default Score;
