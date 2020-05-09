import {useState, useEffect} from "react";
import {mobile, pointColor, Image, breakPoints, IconFrame, desktop} from "common/theme/theme";
import styled from "styled-components";
import BingoBoard from "common/utils/BingoBoard";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "react-responsive-modal";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {PREFIX} from "client/constants";
import {resetCounts} from "modules/bingo";
import domtoimage from "dom-to-image";
import {saveAs} from "file-saver";

export default function Game(props) {
    const dispatch = useDispatch();
    const [showResultImage, toggleResultImage] = useState(false);
    const [gameStatus, setGameStatus] = useState("running");
    const gameObjects = useSelector(state => state.bingo.gameObjects);
    const markedCounts = useSelector(state => state.bingo.counts);

    const getResult = () => {
        if (markedCounts <= 5) {
            return (
                <Image
                    src={gameObjects.result1}
                />
            )
        } else if (markedCounts >= 6 && markedCounts <= 14) {
            return (
                <Image
                    src={gameObjects.result2}
                />
            )
        } else if (markedCounts >= 15 && markedCounts <= 21) {
            return (
                <Image
                    src={gameObjects.result3}
                />
            )
        } else if (markedCounts >= 22 && markedCounts <= 25) {
            return (
                <Image
                    src={gameObjects.result4}
                />
            )
        }
    };

    const replayGame = () => {
        toggleResultImage(false);
        dispatch(resetCounts());
        setGameStatus("reset");
    };

    const saveImage = () => {
        const node = document.getElementById("bingo");

        domtoimage.toBlob(node)
            .then((blob) => {
                saveAs(blob, "bingoring.png");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <ContainerFrame>
            <div id="bingo">
                <Image
                    src={gameObjects.board}
                />
                <BoardFrame>
                    <BingoBoard
                        boardSize={props.boardSize}
                        gameStatus={gameStatus}
                        setGameStatus={setGameStatus}
                    />
                </BoardFrame>
                {
                    showResultImage &&
                    <div className="result-image">
                        {getResult()}
                    </div>
                }
            </div>
            {
                showResultImage ?
                    <ResultContent>
                    <ResultButtonFrame>
                        <SaveButton onClick={() => saveImage()}>
                            <IconFrame
                                size={mobile(20)}
                                marginRight={mobile(10)}
                            >
                                <Image
                                    src={`${PREFIX}/static/images/icons/download.svg`}
                                />
                            </IconFrame>
                            <ButtonText>
                                이미지로 저장
                            </ButtonText>
                        </SaveButton>
                        <RestartButton onClick={() => replayGame()}>
                            <IconFrame
                                size={mobile(25)}
                                marginRight={mobile(10)}
                            >
                                <Image
                                    src={`${PREFIX}/static/images/icons/play2.svg`}
                                />
                            </IconFrame>
                            <ButtonText color={pointColor.purpleDark}>
                                다시하기
                            </ButtonText>
                        </RestartButton>
                    </ResultButtonFrame>
                    </ResultContent>
                    :
                    <ButtonFrame>
                        <Message>
                            체크하려면 해당하는 칸을 클릭하세요.
                        </Message>
                        <ResultButton onClick={() => toggleResultImage(true)}>
                            <IconFrame
                                size={mobile(20)}
                                marginRight={mobile(10)}
                            >
                                <Image
                                    src={`${PREFIX}/static/images/icons/play.svg`}
                                />
                            </IconFrame>
                            <ButtonText>
                                결과보기
                            </ButtonText>
                        </ResultButton>
                        <ShareButton>
                            <IconFrame
                                size={mobile(25)}
                                marginRight={mobile(10)}
                            >
                                <Image
                                    src={`${PREFIX}/static/images/icons/share.svg`}
                                />
                            </IconFrame>
                            <ButtonText color={pointColor.purpleDark}>
                                공유하기
                            </ButtonText>
                        </ShareButton>
                    </ButtonFrame>
            }
        </ContainerFrame>
    )
}

const SaveButton = styled.div`
    width: 55%;
    height: ${mobile(70)};
    background: linear-gradient(170deg, ${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 45%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${mobile(50)};
    box-shadow: 0 5px 7px 1px rgba(0, 0, 0, 0.23);
    
    @media ${breakPoints.web} {
        height: 70px;
        border-radius: 50px;
    }
`;

const RestartButton = styled(SaveButton)`
    display: flex;
    width: 40%;
    background: ${pointColor.white};
    
`;

const Message = styled.p`
    margin-top: ${mobile(20)};
    font-size: ${mobile(20)};
    color: ${pointColor.gray7};
    
    @media ${breakPoints.web} {
        font-size: 25px;
    }
`;

const ButtonText = styled.p`
    font-size: ${mobile(30)};
    font-weight: 500;
    color: ${({color}) => color || pointColor.white};
    
    @media ${breakPoints.web} {
        font-size: 2rem;
    }
`;

const ResultContent = styled.div`
    width: 100%;
    background: ${pointColor.white};
    padding: ${mobile(30)} ${mobile(30)} ${mobile(40)} ${mobile(30)};
    
    @media ${breakPoints.web} {
        padding: 30px 25px;
    }
`;

const ResultButton = styled.div`
    margin-top: ${mobile(20)};
    width: 70%;
    height: ${mobile(70)};
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 50%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${mobile(50)};
    box-shadow: 0 5px 7px 1px rgba(0, 0, 0, 0.23);
    
    @media ${breakPoints.web} {
        height: 70px;
        border-radius: 50px;
    }
`;

const ShareButton = styled(ResultButton)`
    background: ${pointColor.white};
`;

const ButtonFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: ${pointColor.white};
    padding-bottom: ${mobile(50)};
    border-bottom: ${mobile(1)} solid ${pointColor.gray1};
`;

const ResultButtonFrame = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    @media ${breakPoints.web} {
        margin-top: 30px;
    }
`;

const BoardFrame = styled.div`
    position: absolute;
    top: ${mobile(220)};
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    
    @media ${breakPoints.web} {
        top: 220px;
    }
    
`;

const ContainerFrame = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    
    .result-image {
        margin-top: ${mobile(-8)};
    }
    
    @media ${breakPoints.web} {
        .ring-wrapper {
            width: ${desktop(20)};
            height: ${desktop(20)};
        }
        
        .result-image {
            margin-top: -10px;
        }
    }
`;
