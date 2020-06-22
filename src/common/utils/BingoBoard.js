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
  const {game} = props;

  // const gameObjects = useSelector(state => state.bingo.gameObjects);


  const initialize = () => {
    const size = props.size ? Math.pow(props.size) : 25;
    const _tempArray = [];
    for (let i = 0; i < size; ++i) {
      _tempArray[i] = i + 1;
    }

    const _tempArray2 = _tempArray?.map((item, index) => {
      return {
        id: index + 1,
        marked: false,
      }
    });

    const _tempArray3 = _.chunk(_tempArray2, 5);

    updateBoard(_tempArray3);
    setLoading(false);
  };

  useEffect(() => {
    // dispatch(commitCounts(count));
  }, [count]);


  useEffect(() => {
    initialize();

    if(window) {
      const _clientWidth = window.innerWidth > MAX_CLIENT_WIDTH ? MAX_CLIENT_WIDTH : window.innerWidth;

      setClientWidth(_clientWidth);
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

    const markedCounts = _.flattenDeep(_tempBoard).filter(item => item.marked).length;
    updateCount(markedCounts);
    updateBoard(_tempBoard);
  };


  return isLoading ?
    null
    :
    (
      <ContainerFrame
        className="board"
        width={clientWidth}
        size={props.boardSize}
      >
        {
          board?.map((row, rowIndex) => (
            <RowFrame
              key={rowIndex.toString()}
              index={rowIndex}
            >
              {
                row?.map((item, itemIndex) => (
                  <BingoItem
                    className="item"
                    onClick={props.gameStatus === "stop" ? null : () => markItem(item.id)}
                    key={itemIndex.toString()}
                    boardSize={clientWidth}
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
                            width={(clientWidth / row.length) - 20}
                            height={(clientWidth / row.length) - 20}
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
    width: ${({width}) => width}px;
    height: ${({height}) => height}px;
    
    @media ${breakPoints.web} {
        width: ${({width}) => width - 30}px;
        height: ${({height}) => height - 30}px;
    }
`;

const Ring = styled(Image)`
    width: 100%;
    height: 100%;
`;

const BingoItem = styled.div`
    width: ${props => (props.boardSize / props.columnCount) - 10}px;
    height: ${props => (props.boardSize / props.columnCount) - 10}px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;
    margin-left: ${({index}) => index > 0 ? 2 : 0}px;
    
    @media ${breakPoints.web} {
        width: 100px;
        height: 100px;
    }
    
`;

const RowFrame = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${({index}) => index > 0 ? 1.5 : 0}px;
`;

const ContainerFrame = styled.div`
    width: ${({width}) => width - 70}px;
    height: ${({width}) => width - 70}px;
    box-sizing: border-box;
    
    @media ${breakPoints.web} {
        
    }
`;
