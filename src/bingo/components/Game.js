import {useState, useEffect} from "react";
import {mobile, pointColor, Image, breakPoints, IconFrame, desktop} from "common/theme/theme";
import styled from "styled-components";
import BingoBoard from "common/utils/BingoBoard";
import Share from "common/components/share/Share";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import {LOAD_BINGO, LOAD_LOCAL_BINGO} from "modules/scheme";
import {MAX_CLIENT_WIDTH} from "common/constants/constants";
import {GAMES} from "mock/data";


export default function Game(props) {
  const router = useRouter();
  const gameId = router.query.id;
  const {data} = useQuery(LOAD_BINGO);

  const games = data?.allBingos?.edges;

  const [showResultImage, toggleResultImage] = useState(false);
  const [gameStatus, setGameStatus] = useState("running");
  const [matchedGame, setMatchedGame] = useState(null);
  const [clientWidth, setClientWidth] = useState(null);
  const [markedCounts, setMarkedCounts] = useState(0);
  const [resultImagePath, setResultImagePath] = useState(null);

  const [resultBoardArray, setResultBoardArray] = useState(null);

  useEffect(() => {
    if (window) {
      const _clientWidth = window.innerWidth > MAX_CLIENT_WIDTH ? MAX_CLIENT_WIDTH : window.innerWidth;
      setClientWidth(_clientWidth);
    }
  }, []);


  useEffect(() => {
    console.log(_matchedGame);
    const _matchedGame = games?.find(item => item.node.id === gameId);
    setMatchedGame(_matchedGame);
    window.scrollTo(0, 1);
  }, [gameId, games]);

  // useEffect(() => {
  //   const _matchedGame = GAMES?.find(item => item.id === parseInt(gameId));
  //   console.log("matched game::: ", _matchedGame);
  //   setMatchedGame(_matchedGame);
  //   window.scrollTo(0, 1);
  // }, [gameId]);

  const showResults = () => {
    toggleResultImage(true);
    setGameStatus("stop");
  };

  const getResult = () => {
    if (markedCounts <= 6) {
      return (
        <Image
          src={matchedGame?.node?.bingoResults[0]?.image}
        />
      )
    } else if (markedCounts >= 7 && markedCounts <= 13) {
      return (
        <Image
          src={matchedGame?.node?.bingoResults[1]?.image}
        />
      )
    } else if (markedCounts >= 14 && markedCounts <= 19) {
      return (
        <Image
          src={matchedGame?.node?.bingoResults[2]?.image}
        />
      )
    } else if (markedCounts >= 20 && markedCounts <= 25) {
      return (
        <Image
          src={matchedGame?.node?.bingoResults[3]?.image}
        />
      )
    }
  };

  useEffect(() => {
    if (markedCounts <= 6) {
      setResultImagePath(matchedGame?.node?.bingoResults[0]?.image);
    } else if (markedCounts >= 7 && markedCounts <= 13) {
      setResultImagePath(matchedGame?.node?.bingoResults[1]?.image);
    } else if (markedCounts >= 14 && markedCounts <= 19) {
      setResultImagePath(matchedGame?.node?.bingoResults[2]?.image);
    } else if (markedCounts >= 20 && markedCounts <= 25) {
      setResultImagePath(matchedGame?.node?.bingoResults[3]?.image);
    }
  }, [markedCounts]);

  const replayGame = () => {
    toggleResultImage(false);
    // dispatch(resetCounts());
    setGameStatus("reset");
  };

  const saveImage = () => {
    // const node = document.getElementById("bingo");

    // alert('아직 지원하지 않는 기능입니다.');
    const boardImage = document.createElement("img");
    const resultImage = document.createElement("img");
    const ring = document.createElement("img");

    const _boardHeight = clientWidth * 1.25;
    const _resultHeight = clientWidth * 0.23;
    const canvas = `<canvas id='canvas' width='${clientWidth}' height='${_boardHeight + _resultHeight}'></canvas>`

    boardImage.src = matchedGame?.node?.boardTheme?.boardImage;
    resultImage.src = resultImagePath ?? "";

    const x = window.open();
    x.document.open();

    x.document.write(canvas);
    const _xCanvas = x.document.getElementById("canvas").getContext("2d");
    boardImage.onload = function() {
      _xCanvas.drawImage(boardImage, 0, 0, clientWidth,  _boardHeight);
    };

    resultImage.onload = function() {
      _xCanvas.drawImage(resultImage, 0, _boardHeight, clientWidth, _resultHeight);
    };

    x.document.close();

    // domtoimage.toJpeg(node, {quality: 0.95})
    //   .then((dataUrl) => {
    //     const link = document.createElement("a");
    //     link.href = dataUrl;
    //
    //     const iframe = "<iframe style='border: none' width='100%' height='100%' src='" + dataUrl + "'></iframe>"
    //     const x = window.open();
    //     x.document.open();
    //     x.document.write(iframe);
    //     x.document.close();
    //   })
    //   .catch((err) => {
    //     console.log("저장중에 에러::", err);
    //   })
  };

  return (
    <ContainerFrame>
      <ContentWrapper>
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
                <SaveButton onClick={() => saveImage()}>
                  <IconFrame
                    size="10px"
                    marginRight="5px"
                  >
                    <Image
                      src={`/static/images/icons/download.svg`}
                    />
                  </IconFrame>
                  <ButtonText>
                    이미지로 저장
                  </ButtonText>
                </SaveButton>
                <RestartButton onClick={() => replayGame()}>
                  <IconFrame
                    size="12.5px"
                    marginRight="5px"
                  >
                    <Image
                      src={`/static/images/icons/play2.svg`}
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
                  size="10px"
                  marginRight="5px"
                >
                  <Image
                    src={`/static/images/icons/play.svg`}
                  />
                </IconFrame>
                <ButtonText>
                  결과보기
                </ButtonText>
              </ResultButton>
              <ShareButton>
                <IconFrame
                  size="12.5px"
                  marginRight="10px"
                >
                  <Image
                    src={`/static/images/icons/share.svg`}
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
    width: 52.8%;
    height: 46px;
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 23px;
     box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.16);   
`;

const RestartButton = styled(SaveButton)`
    display: flex;
    width: 34.4%;
    background: ${pointColor.white};
    
`;

const Message = styled.p`
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 14px;
    color: ${pointColor.gray8};
   
`;

const ButtonText = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: ${({color}) => color || pointColor.white};
    
    @media ${breakPoints.web} {
        font-size: 18px;
    }
`;

const ResultContent = styled.div`
    width: 100%;
    background: ${pointColor.white};
    padding: 22px 18px 30px 18px;
`;

const ResultButton = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 46px;
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.2);
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
