import {useState, useEffect} from "react";
import {pointColor, Image, breakPoints, IconFrame,} from "common/theme/theme";
import styled from "styled-components";
import BingoBoard from "common/utils/BingoBoard";
import Share from "common/components/share/Share";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import {LOAD_BINGO} from "modules/scheme";
import {MAX_CLIENT_WIDTH} from "common/constants/constants";
import {motion} from "framer-motion";
import Modal from "common/components/modal/Modal";
import OneButtonModal from "common/components/modal/OneButtonModal";
import {BASE_URL} from "client/constants";
import Head from "next/head";

export default function Game(props) {
  const router = useRouter();
  const gameId = router.query.id;
  const {loading, error, data} = useQuery(LOAD_BINGO);

  const games = data?.allBingos?.edges;

  const [showUrlModal, toggleUrlModal] = useState(false);

  const [showResultImage, toggleResultImage] = useState(false);
  const [gameStatus, setGameStatus] = useState("running");
  const [matchedGame, setMatchedGame] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);
  const [markedCounts, setMarkedCounts] = useState(0);
  const [resultImagePath, setResultImagePath] = useState(null);
  const [showShareModal, toggleShareModal] = useState(false);

  const [resultBoardArray, setResultBoardArray] = useState(null);

  useEffect(() => {

    if (window) {
      const _clientWidth = window.innerWidth > MAX_CLIENT_WIDTH ? MAX_CLIENT_WIDTH : window.innerWidth;
      setClientWidth(_clientWidth);
    }
  }, []);

  useEffect(() => {
    const _matchedGame = games?.find(item => item.node.id === gameId);
    setMatchedGame(_matchedGame);
    window.scrollTo(0, 1);
  }, [gameId, games]);

  const showResults = () => {
    toggleResultImage(true);
    setGameStatus("stop");
  };

  useEffect(() => {
    if (matchedGame?.node?.boardTheme?.size === 5) {
      if (markedCounts <= 7) {
        setResultImagePath(matchedGame?.node?.bingoResults[0]?.image);
      } else if (markedCounts >= 7 && markedCounts <= 13) {
        setResultImagePath(matchedGame?.node?.bingoResults[1]?.image);
      } else if (markedCounts >= 14 && markedCounts <= 19) {
        setResultImagePath(matchedGame?.node?.bingoResults[2]?.image);
      } else if (markedCounts >= 20 && markedCounts <= 25) {
        setResultImagePath(matchedGame?.node?.bingoResults[3]?.image);
      }
    }

    if (matchedGame?.node?.boardTheme?.size === 6) {
      if (markedCounts <= 10) {
        setResultImagePath(matchedGame?.node?.bingoResults[0]?.image);
      } else if (markedCounts >= 11 && markedCounts <= 20) {
        setResultImagePath(matchedGame?.node?.bingoResults[1]?.image);
      } else if (markedCounts >= 21 && markedCounts <= 28) {
        setResultImagePath(matchedGame?.node?.bingoResults[2]?.image);
      } else if (markedCounts >= 29 && markedCounts <= 36) {
        setResultImagePath(matchedGame?.node?.bingoResults[3]?.image);
      }
    }
  }, [markedCounts]);

  const replayGame = () => {
    toggleResultImage(false);
    setGameStatus("reset");
  };

  const saveImage = () => {
    const ABSOLUTE_BOARD_SIZE_X = 360;
    const ABSOLUTE_BOARD_SIZE_Y = 450;
    const _resultHeight = 80;
    const canvas = `<canvas id='canvas' width='${ABSOLUTE_BOARD_SIZE_X}' height='${ABSOLUTE_BOARD_SIZE_Y + _resultHeight}'></canvas>`;


    const RING_SIZE = 56;
    const SIDE_WIDTH = 40;

    const x = window.open("", "_blank");
    x.document.open();
    x.document.write(`<body style="margin: 0"><div id="container" ></div></body>`);
    const boardImage = x.document.createElement("img");
    const resultImage = x.document.createElement("img");
    const ringImage = x.document.createElement("img");
    const xContainer = x.document.getElementById("container");
    let __loadedCounts = 0;

    boardImage.crossOrigin = "anonymous";
    resultImage.crossOrigin = "anonymous";
    ringImage.crossOrigin = "anonymous";

    boardImage.src = matchedGame?.node?.boardTheme?.boardImage + "?" + performance.now();
    resultImage.src = resultImagePath + "?" + performance.now();
    ringImage.src = matchedGame?.node?.boardTheme?.ringImage + "?" + performance.now();

    // x.document.write(canvas);
    xContainer.innerHTML = canvas;
    const __canvas = x.document.getElementById("canvas");
    const _xCanvas = __canvas.getContext("2d");

    const images = [boardImage, resultImage, ringImage];

    const calcLocation = (location) => {
      const GAP = 9;
      const positionY = 110;
      return {
        x: (SIDE_WIDTH / 2 + (location.x * RING_SIZE) + (location.x * GAP)) + 2,
        y: (positionY + (location.y * RING_SIZE) + (location.y * GAP)) + 2
      }
    };

    for (let i = 0; i < images.length; i++) {
      images[i].onload = function () {
        __loadedCounts++;
        if (__loadedCounts === images.length) {
          allLoaded();
        }
      }
    }

    const allLoaded = () => {
      _xCanvas.drawImage(boardImage, 0, 0, ABSOLUTE_BOARD_SIZE_X, ABSOLUTE_BOARD_SIZE_Y);
      _xCanvas.drawImage(resultImage, 0, ABSOLUTE_BOARD_SIZE_Y, ABSOLUTE_BOARD_SIZE_X, _resultHeight);

      for (let i = 0; i < resultBoardArray.length; ++i) {
        const location = calcLocation(resultBoardArray[i].location);
        _xCanvas.drawImage(ringImage, location.x, location.y, RING_SIZE, RING_SIZE)
      }

      let dataUrl = __canvas.toDataURL("image/png");

      dataUrl = dataUrl.replace("image/png", 'image/octet-stream');
      dataUrl = dataUrl.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

      const __img = `<img src="" width="100%" height="100%" id="results" style="object-fit: contain;"/>`;
      const __desktopImg = `<a id="link"><img src="" width="100%" height="100%" id="results" style="object-fit: contain;"/></a>`;
      const isDesktop = window.innerWidth > 540;

      xContainer.innerHTML = isDesktop ? __desktopImg : __img;

      const _resultImage = x.document.getElementById("results");
      if (isDesktop) {
        const _link = x.document.getElementById("link");
        _link.href = dataUrl;
        _link.download = "빙고링.png";
      }
      _resultImage.src = dataUrl;

      _resultImage.onload = function () {
        x.document.close();
      };
    };
  };

  const onCopyUrl = () => {
    toggleShareModal(false);
    toggleUrlModal(true);
  };

  if (error) return "에러";
  if (!matchedGame) return "loading...";

  return (
    <>
      <ContainerFrame>
        <ContentWrapper>
          {
            showShareModal &&
            <Modal hideModal={() => toggleShareModal(false)}>
              <Share
                onCopyUrl={onCopyUrl}
                game={matchedGame?.node}
              />
            </Modal>
          }
          {
            showUrlModal &&
            <OneButtonModal
              hideModal={() => toggleUrlModal(false)}
            />
          }

          <BingoFrame id="bingo">
            <Image
              crossorigin
              src={matchedGame?.node?.boardTheme?.boardImage}
            />
            <BoardFrame className="board-frame-container" width={clientWidth}>
              <BingoBoard
                setMarkedCounts={setMarkedCounts}
                boardSize={props.boardSize}
                gameStatus={gameStatus}
                game={matchedGame?.node}
                gameSize={matchedGame?.node?.boardTheme?.size}
                setGameStatus={setGameStatus}
                setResultBoard={setResultBoardArray}
              />
            </BoardFrame>
            {
              showResultImage &&
              <div className="result-image" style={{marginTop: -5}}>
                <Image
                  src={resultImagePath}
                />
              </div>
            }
          </BingoFrame>
          {
            showResultImage ?
              <ResultContent>
                <ResultButtonFrame>
                  <SaveButton
                    onClick={() => saveImage()}
                    whileTap={{scale: 0.95}}
                  >
                    <SaveIcon>
                      <Image
                        src={`/static/images/icons/download.svg`}
                      />
                    </SaveIcon>
                    <ButtonText>
                      이미지로 저장
                    </ButtonText>
                  </SaveButton>
                  <RestartButton
                    onClick={() => replayGame()}
                    whileTap={{scale: 0.95}}
                  >
                    <PlayIcon>
                      <Image
                        src={`/static/images/icons/play2.svg`}
                      />
                    </PlayIcon>
                    <ButtonText color={pointColor.purpleDark}>
                      다시하기
                    </ButtonText>
                  </RestartButton>
                </ResultButtonFrame>
                <div style={{paddingTop: 30}}>
                  <Share
                    onCopyUrl={onCopyUrl}
                    game={matchedGame?.node}
                  />
                </div>
              </ResultContent>
              :
              <ButtonFrame>
                <Message>
                  체크하려면 해당하는 칸을 클릭하세요.
                </Message>
                <ResultButton
                  onClick={() => markedCounts > 0 && showResults()}
                  whileTap={{scale: 0.95}}
                >
                  {/*0개일 때 회색*/}
                  <PlayIcon>
                    <Image
                      src={`/static/images/icons/play.svg`}
                    />
                  </PlayIcon>
                  <ButtonText>
                    결과보기
                  </ButtonText>
                </ResultButton>
                <ShareButton
                  onClick={() => toggleShareModal(true)}
                  whileTap={{scale: 0.95}}
                >
                  <ShareIcon>
                    <Image
                      src={`/static/images/icons/share.svg`}
                    />
                  </ShareIcon>
                  <ButtonText color={pointColor.purpleDark}>
                    공유하기
                  </ButtonText>
                </ShareButton>
              </ButtonFrame>
          }
        </ContentWrapper>
      </ContainerFrame>
    </>
  )
}

const SaveIcon = styled.div`
  margin-right: 5px;
  margin-bottom: 10px;
  width: 12.5px;
  height: 12.5px;
  
  ${breakPoints.web} {
    width: 15px;
    height: 15px;
    margin-right: 8px;
    margin-bottom: 5px;
  }
`;

const PlayIcon = styled(SaveIcon)`
`;

const ShareIcon = styled(PlayIcon)`

`;


const ContentWrapper = styled.div`
`;

const BingoFrame = styled.div`
    
`;

const SaveButton = styled(motion.div)`
    width: 190px;
    height: 46px;
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 23px;
    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.16);
    ${breakPoints.web} {
      width: 296px;
      height: 54px;
      border-radius: 35px;
    }   
`;

const RestartButton = styled(SaveButton)`
    display: flex;
    width: 124px;
    background: ${pointColor.white};
    ${breakPoints.web} {
      width: 170px;
    }
`;

const Message = styled.p`
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 14px;
    color: ${pointColor.gray8};
   
`;

const ButtonText = styled.p`
    font-size: 16px;
    font-weight: 700;
    color: ${({color}) => color || pointColor.white};
    
    ${breakPoints.web} {
        font-size: 20px;
    }
`;

const ResultContent = styled.div`
    width: 100%;
    background: ${pointColor.white};
    padding: 22px 18px 30px 18px;
`;

const ResultButton = styled(motion.div)`
    margin-top: 10px;
    width: 100%;
    height: 46px;
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.2);
    ${breakPoints.web} {
      height: 54px;
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
    padding: 5px 30px 35px 30px;
    border-bottom: 1px solid ${pointColor.gray1};
    ${breakPoints.web} {
      padding: 20px 90px 50px;
    }
`;

const ResultButtonFrame = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const BoardFrame = styled.div`
    position: absolute;
    top: ${({width}) => ((width) * 0.30) + 3}px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    
    @media ${breakPoints.web} {
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
        margin-top: -4px;
    }
`;
