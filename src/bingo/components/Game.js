import {useState, useEffect} from "react";
import {mobile, pointColor, Image, breakPoints, IconFrame, desktop} from "common/theme/theme";
import styled from "styled-components";
import BingoBoard from "common/utils/BingoBoard";
import {useDispatch, useSelector} from "react-redux";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {PREFIX} from "client/constants";
import {loadBingos, resetCounts} from "modules/bingo";
import domtoimage from "dom-to-image";
import {saveAs} from "file-saver";
import Share from "../../common/components/share/Share";
import {useRouter} from "next/router";

export default function Game(props) {
    const dispatch = useDispatch();
    const router = useRouter();

    const gameId = router.query.id;

    const games = useSelector(state => state.bingo.games);

    const [showResultImage, toggleResultImage] = useState(false);
    const [gameStatus, setGameStatus] = useState("running");
    const markedCounts = useSelector(state => state.bingo.counts);
    const [matchedGame, setMatchedGame] = useState(null);

    useEffect(() => {
        dispatch(loadBingos());
    }, []);

    useEffect(() => {
        const _matchedGame = games?.find(item => item._id === parseInt(gameId));
        setMatchedGame(_matchedGame);
        window.scrollTo(0, 1);
    }, [gameId, games]);

    const showResults = () => {
        toggleResultImage(true);
        setGameStatus("stop");
    };

    const getResult = () => {
        if (markedCounts <= 5) {
            return (
                <Image
                    src={matchedGame?.result_images[0]}
                />
            )
        } else if (markedCounts >= 6 && markedCounts <= 14) {
            return (
                <Image
                    src={matchedGame?.result_images[1]}
                />
            )
        } else if (markedCounts >= 15 && markedCounts <= 21) {
            return (
                <Image
                    src={matchedGame?.result_images[2]}
                />
            )
        } else if (markedCounts >= 22 && markedCounts <= 25) {
            return (
                <Image
                    src={matchedGame?.result_images[3]}
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

        domtoimage.toJpeg(node, {quality: 0.95})
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.href = dataUrl;

                const iframe = "<iframe style='border: none' width='100%' height='100%' src='" + dataUrl + "'></iframe>"
                const x = window.open();
                x.document.open();
                x.document.write(iframe);
                x.document.close();
            })
            .catch((err) => {
                console.log("저장중에 에러::", err);
            })
    };

    return (
        <ContainerFrame>
            <ContentWrapper>
                <BingoFrame id="bingo">
                    <Image
                        src={matchedGame?.board}
                    />
                    <BoardFrame className="board-frame-container">
                        <BingoBoard
                            boardSize={props.boardSize}
                            gameStatus={gameStatus}
                            game={matchedGame}
                            setGameStatus={setGameStatus}
                        />
                    </BoardFrame>
                    {
                        showResultImage &&
                        <div className="result-image" style={{marginTop: mobile(-10)}}>
                            {getResult()}
                        </div>
                    }
                </BingoFrame>
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
                            <Share/>
                        </ResultContent>
                        :
                        <ButtonFrame>
                            <Message>
                                체크하려면 해당하는 칸을 클릭하세요.
                            </Message>
                            <ResultButton onClick={() => showResults()}>
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
            </ContentWrapper>
        </ContainerFrame>
    )
}
const ContentWrapper = styled.div`
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.23);
`;
const BingoFrame = styled.div`
`;

const SaveButton = styled.div`
    width: ${mobile(350)};
    height: ${mobile(80)};
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${mobile(50)};
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);
    
    @media ${breakPoints.web} {
        height: 70px;
        border-radius: 50px;
    }
`;

const RestartButton = styled(SaveButton)`
    display: flex;
    width: ${mobile(210)};
    background: ${pointColor.white};
    
`;

const Message = styled.p`
    margin-top: 0;
    font-size: ${mobile(24)};
    color: ${pointColor.gray8};
    
    @media ${breakPoints.web} {
        font-size: 25px;
    }
`;

const ButtonText = styled.p`
    font-size: ${mobile(28)};
    font-weight: bold;
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
    height: ${mobile(80)};
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${mobile(50)};
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.2);
    
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
    padding-top: ${mobile(10)};
    padding-bottom: ${mobile(70)};
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
    top: ${mobile(200)};
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    
    @media ${breakPoints.web} {
        top: 170px;
        width: 500px;
        height: 500px;
    }
    
`;

const ContainerFrame = styled.div`
    width: 100%;
    padding: 0 ${mobile(36)};
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
        padding: 0 80px;
        
        .ring-wrapper {
            width: ${desktop(20)};
            height: ${desktop(20)};
        }
        
        .result-image {
            margin-top: -10px;
        }
    }
`;
