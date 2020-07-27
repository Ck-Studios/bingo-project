import {useState, useEffect} from "react";
import _ from "lodash";
import styled from "styled-components";
import {Lottie} from "@crello/react-lottie";
import {useDispatch, useSelector} from "react-redux";
import {mobile, breakPoints, Image, desktop} from "common/theme/theme";
import * as animationData from "common/animation/lottie/pencil";
import {commitCounts} from "modules/bingo";
import {MAX_CLIENT_WIDTH} from "common/constants/constants";

const animationConfig = {
  loop: false,
  autoplay: false,
  animationData: animationData.default
};

export default function BingoBoard(props) {
  const [board, updateBoard] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [count, updateCount] = useState(0);
  const [clientWidth, setClientWidth] = useState(null);
  const [boardContainerSize, setBoardContainerSize] = useState(null);
  const {game} = props;

  // const gameObjects = useSelector(state => state.bingo.gameObjects);


  const initialize = () => {
    const size = props.gameSize ? Math.pow(props.gameSize) : 25;
    const _tempArray = [];
    for (let i = 0; i < size; ++i) {
      _tempArray[i] = i + 1;

    }

    const _tempArray2 = _tempArray?.map((item, index) => {
      return {
        id: index + 1,
        marked: false,
        location: {
          x: 0,
          y: 0,
        }
      }
    });


    const _tempArray3 = _.chunk(_tempArray2, props?.gameSize || 5);

    for(let i = 0; i < _tempArray3.length; ++i) {
      for(let j = 0; j < _tempArray3.length; ++j) {
        _tempArray3[i][j].location.x = j;
        _tempArray3[i][j].location.y = i;
      }
    }

    updateBoard(_tempArray3);
    setLoading(false);
  };

  useEffect(() => {
    // dispatch(commitCounts(count));
    props.setMarkedCounts(count);
  }, [count]);


  useEffect(() => {
    initialize();

    if(window) {
      const _clientWidth = window.innerWidth > MAX_CLIENT_WIDTH ? MAX_CLIENT_WIDTH : window.innerWidth;
      const _boardContainerSize = (_clientWidth * 0.89);

      setClientWidth(_clientWidth);
      setBoardContainerSize(_boardContainerSize)
    }
  }, []);

  useEffect(() => {
    if (props.gameStatus === "reset") {
      initialize();
      updateCount(0);
      props.setGameStatus("running");
    }
  }, [props.gameStatus]);

  const markItem = (id) => {
    const _tempBoard = board.map(row => {
      return row.map(item => {
        return item.id === id ?
          Object.assign({}, item, {marked: !item.marked})
          :
          item;
      })
    });
    const filteredItems = _.flattenDeep(_tempBoard).filter(item => item.marked);
    const markedCounts = filteredItems.length;

    // props.setResultBoard(filteredItems);

    updateCount(markedCounts);
    updateBoard(_tempBoard);
    console.log(filteredItems);
    props.setResultBoard(filteredItems);
  };


  return isLoading ?
    null
    :
    (
      <ContainerFrame
        className="board"
        size={boardContainerSize}
      >
        {
          board?.map((row, rowIndex) => (
            <RowFrame
              key={rowIndex.toString()}
              boardSize={boardContainerSize}
              gameSize={props?.gameSize}
              index={rowIndex}
            >
              {
                row?.map((item, itemIndex) => (
                  <BingoItem
                    className="item"
                    onClick={props.gameStatus === "stop" ? null : () => markItem(item.id)}
                    key={itemIndex.toString()}
                    boardSize={boardContainerSize}
                    columnCount={row.length}
                    index={itemIndex}
                    marked={item.marked}
                  >
                    {
                      game?.boardTheme?.ringImage === "default" ?
                        <AnimationFrame>
                          <Lottie
                            className="ring"
                            playingState={
                              item.marked ?
                                "playing"
                                :
                                "stopped"
                            }
                            config={animationConfig}
                            width={clientWidth / row.length}
                            height={clientWidth / row.length}
                            speed={0.7}
                            isClickToPauseDisabled={false}
                            isStopped={!item.marked}
                            isPaused={!item.marked}
                          />
                        </AnimationFrame>
                        :
                        item.marked ?
                          <RingFrame
                            className="ring"
                            size={(boardContainerSize / row.length) - 6}
                          >
                            <Ring
                              src={game?.boardTheme?.ringImage}
                              contain
                            />
                          </RingFrame>
                          :
                          null
                    }
                  </BingoItem>
                ))
              }
            </RowFrame>
          ))
        }
      </ContainerFrame>
    )
}

const AnimationFrame = styled.div`
    position: absolute;
    z-index: 10;
`;

const RingFrame = styled.div`
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
`;

const Ring = styled(Image)`
    width: 100%;
    height: 100%;
`;

const BingoItem = styled.div`
    box-sizing: border-box;
    width: ${props => ((props.boardSize / props.columnCount) - 5)}px;
    height: ${props =>((props.boardSize / props.columnCount) - 5)}px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;
    margin-left: ${({index, boardSize}) => index > 0 ? 5 : 0}px;
`;

const RowFrame = styled.div`
    display: flex;
    height: ${({boardSize, gameSize}) => (boardSize / gameSize) - 4.5}px;
    margin-top: ${({index, boardSize}) => index > 0 ? 5 : 0}px;
    justify-content: center;
    align-items: center;
    padding: 0 1px;
    
`;

const ContainerFrame = styled.div`
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    box-sizing: border-box;
   
`;
