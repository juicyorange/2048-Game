import styled from 'styled-components';

const GameBlock = styled.div`
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

interface IBlockProps {
  item: number;
}

const Block: React.FC<IBlockProps> = ({ item }) => {
  return (
    <GameBlock
      style={{
        background: getColors(item),
        color: item === 2 || item === 4 ? `#645B52` : `#F7F4EF`,
      }}
    >
      {item ? item : ''}
    </GameBlock>
  );
};

export default Block;

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
    case 4096:
      return '#2385D0';
    case 8192:
      return '#000000';
    default:
      return '#C2B3A3';
  }
};
