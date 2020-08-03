import {useState, useEffect} from "react";
import _ from "lodash";
import styled, {keyframes} from "styled-components";
import {Lottie} from "@crello/react-lottie";
import {mobile, breakPoints, Image, desktop} from "common/theme/theme";
import {AnimatePresence, motion} from "framer-motion";
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

  const initialize = () => {
    const size = props.gameSize;
    const boardSize = Math.pow(size, 2);

    const _tempArray = _.fill(Array(boardSize), 0);
    const _tempArray2 = _tempArray.map((item, index) => {
      return {
        id: index + 1,
        marked: false,
        location: {
          x: 0,
          y: 0,
        }
      }
    });

    const _tempArray3 = _.chunk(_tempArray2, size).map((i, indexI) => {
      i.map((j, indexJ) => {
        i[indexJ].location.x = indexJ;
        i[indexJ].location.y = indexI;
        return j;
      });

      return i;
    });

    updateBoard(_tempArray3);
    setLoading(false);
  };

  useEffect(() => {
    props.setMarkedCounts(count);
  }, [count]);

  useEffect(() => {
    if (window) {
      const _clientWidth = window.innerWidth > MAX_CLIENT_WIDTH ? MAX_CLIENT_WIDTH : window.innerWidth;
      const _boardContainerSize = (_clientWidth * 0.89);

      setClientWidth(_clientWidth);
      setBoardContainerSize(_boardContainerSize);
      initialize();
    }
  }, []);

  useEffect(() => {
    if (props.gameStatus === "reset") {
      updateCount(0);
      props.setGameStatus("running");
      initialize();
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
                    onClick={props.gameStatus === "running" ? () => markItem(item.id) : null}
                    key={itemIndex.toString()}
                    boardSize={boardContainerSize}
                    columnCount={row.length}
                    index={itemIndex}
                    marked={item.marked}
                  >
                    <AnimatePresence>
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
                              key="ring"
                              variants={{
                                initial: {
                                  opacity: 0,
                                },
                                enter: {
                                  opacity: 1,
                                  transition: {duration: 0.3, ease: [0.48, 0.15, 0.25, 0.96]}
                                },
                                exit: {
                                  opacity: 0,
                                  transition: {duration: 0.3, ease: [0.48, 0.15, 0.25, 0.96]}
                                }
                              }}
                              initial="initial"
                              animate="enter"
                              exit="exit"
                              className="ring"
                              size={(boardContainerSize / row.length) - 6}
                            >
                              <Ring
                                src={game?.boardTheme?.ringImage}
                                crossorigin
                                contain
                              />
                            </RingFrame>
                            :
                            null
                      }
                    </AnimatePresence>

                  </BingoItem>
                ))
              }
            </RowFrame>
          ))
        }
      </ContainerFrame>

    )
}

const rota = keyframes`
  0% { transform: rotate(0deg); }
  50%, 100% { transform: rotate(360deg); }
`;

const fill = keyframes`
  0% { opacity: 0; }
  50%, 100% { opacity: 1; }
`;

const mask = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;


const Mask = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
`;

const AnimationFrame = styled.div`
    position: absolute;
    z-index: 10;
`;

const RingFrame = styled(motion.div)`
    position: relative;
    width: ${({size}) => size}px;
    height: ${({size}) => size}px;
    z-index: 300;
`;

const Ring = styled(Image)`
    width: 100%;
    height: 100%;
`;

const BingoItem = styled.div`
    box-sizing: border-box;
    width: ${props => ((props.boardSize / props.columnCount) - 5)}px;
    height: ${props => ((props.boardSize / props.columnCount) - 5)}px;
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
