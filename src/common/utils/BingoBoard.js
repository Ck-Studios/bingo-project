import {useState, useEffect} from "react";
import _ from "lodash";
import styled from "styled-components";
import {Lottie} from "@crello/react-lottie";
import {useDispatch, useSelector} from "react-redux";
import {mobile, pointColor, breakPoints, Image} from "common/theme/theme";
import * as animationData from "common/animation/lottie/pencil";
import {commitCounts} from "modules/bingo";

const animationConfig = {
    loop: false,
    autoplay: false,
    animationData: animationData.default
};

export default function BingoBoard(props) {
    const dispatch = useDispatch();
    const [board, updateBoard] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [count, updateCount] = useState(0);

    const gameObjects = useSelector(state => state.bingo.gameObjects);

    useEffect(() => {
        dispatch(commitCounts(count));
    }, [count]);

    useEffect(() => {
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
    }, []);

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
                size={mobile(props.boardSize)}
            >
                {
                    board?.map((row, rowIndex) => (
                        <RowFrame
                            key={rowIndex.toString()}
                        >
                            {
                                row?.map((item, itemIndex) => (
                                    <BingoItem
                                        onClick={() => markItem(item.id)}
                                        key={itemIndex.toString()}
                                        boardSize={props.boardSize}
                                        columnCount={row.length}
                                        index={itemIndex + 1}
                                        marked={item.marked}
                                    >
                                        {
                                            gameObjects.ring === "default" ?
                                                <AnimationFrame>
                                                    <Lottie
                                                        playingState={
                                                            item.marked ?
                                                                "playing"
                                                                :
                                                                "stopped"
                                                        }
                                                        config={animationConfig}
                                                        width={mobile(props.boardSize / row.length)}
                                                        height={mobile(props.boardSize / row.length)}
                                                        speed={0.7}
                                                        isClickToPauseDisabled={false}
                                                        isStopped={!item.marked}
                                                        isPaused={!item.marked}
                                                    />
                                                </AnimationFrame>
                                                :
                                                item.marked ?
                                                    <RingFrame
                                                        width={mobile((props.boardSize / row.length) - 20)}
                                                        height={mobile((props.boardSize / row.length) - 20)}
                                                    >
                                                        <Ring
                                                            src={gameObjects.ring}
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
    width: ${({width}) => width};
    height: ${({height}) => height};
`;

const Ring = styled(Image)`
`;

const BingoItem = styled.div`
    width: ${props => mobile(props.boardSize / props.columnCount)};
    height: ${props => mobile(props.boardSize / props.columnCount)};
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;
    
`;

const RowFrame = styled.div`
    display: flex;
`;

const ContainerFrame = styled.div`
    width: ${({size}) => size || "100%"};
    height: ${({size}) => size || "100%"};
`;
