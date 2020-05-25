import {useState, useEffect} from "react";
import _ from "lodash";
import styled from "styled-components";
import {Lottie} from "@crello/react-lottie";
import {useDispatch, useSelector} from "react-redux";
import {mobile, breakPoints, Image, desktop} from "common/theme/theme";
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
        dispatch(commitCounts(count));
    }, [count]);


    useEffect(() => {
        initialize();
    }, []);

    useEffect(() => {
        if(props.gameStatus === "reset") {
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
                size={props.boardSize}
            >
                {
                    board?.map((row, rowIndex) => (
                        <RowFrame
                            key={rowIndex.toString()}
                        >
                            {
                                row?.map((item, itemIndex) => (
                                    <BingoItem
                                        className="item"
                                        onClick={() => markItem(item.id)}
                                        key={itemIndex.toString()}
                                        boardSize={props.boardSize}
                                        columnCount={row.length}
                                        index={itemIndex + 1}
                                        marked={item.marked}
                                    >
                                        {
                                            game?.ring === "default" ?
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
                                                        className="ring"
                                                        width={(props.boardSize / row.length) - 20}
                                                        height={(props.boardSize / row.length) - 20}
                                                    >
                                                        <Ring
                                                            src={game.ring}
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
    width: ${({width}) => mobile(width)};
    height: ${({height}) => mobile(height)};
    
    @media ${breakPoints.web} {
        width: ${({width}) => desktop(width - 30)};
        height: ${({height}) => desktop(height - 30)};
    }
`;

const Ring = styled(Image)`
    width: 100%;
    height: 100%;
`;

const BingoItem = styled.div`
    width: ${props => mobile(props.boardSize / props.columnCount)};
    height: ${props => mobile(props.boardSize / props.columnCount - 3)};
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    position: relative;
    
    @media ${breakPoints.web} {
        width: 100px;
        height: 100px;
    }
    
`;

const RowFrame = styled.div`
    display: flex;
`;

const ContainerFrame = styled.div`
    width: 100%;
    height: 100%;
    @media ${breakPoints.web} {
        
    }
`;
