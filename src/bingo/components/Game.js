import {useState, useEffect} from "react";
import {mobile, pointColor, Image, breakPoints, IconFrame, desktop} from "common/theme/theme";
import styled from "styled-components";
import BingoBoard from "common/utils/BingoBoard";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {PREFIX} from "client/constants";
import {loadBingos, resetCounts} from "modules/bingo";
import domtoimage from "dom-to-image";
import {saveAs} from "file-saver";
import Share from "common/components/share/Share";
import {useRouter} from "next/router";
import {useQuery} from "@apollo/react-hooks";
import {LOAD_BINGO, LOAD_LOCAL_BINGO} from "modules/scheme";
import {useGetClientWidth} from "common/hooks/common";
import {MAX_CLIENT_WIDTH} from "common/constants/constants";


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
  // const markedCounts = useSelector(state => state.bingo.counts);

  // useEffect(() => {
  //   setGames(data?.allBingos?.edges?.node)
  // }, [data?.allBingos]);

  useEffect(() => {
    if (window) {
      const _clientWidth = window.innerWidth > MAX_CLIENT_WIDTH ? MAX_CLIENT_WIDTH : window.innerWidth;
      console.log("clientWidth::: ", _clientWidth);
      setClientWidth(_clientWidth);
    }
  }, []);


  useEffect(() => {
    const _matchedGame = games?.find(item => item.node.id === gameId);
    console.log("matched game::: ", _matchedGame);
    setMatchedGame(_matchedGame);
    window.scrollTo(0, 1);
  }, [gameId, games]);

  const showResults = () => {
    toggleResultImage(true);
    setGameStatus("stop");
  };

  const getResult = () => {
    // if (markedCounts <= 5) {
    //   return (
    //     <Image
    //       src={matchedGame?.result_images[0]}
    //     />
    //   )
    // } else if (markedCounts >= 6 && markedCounts <= 14) {
    //   return (
    //     <Image
    //       src={matchedGame?.result_images[1]}
    //     />
    //   )
    // } else if (markedCounts >= 15 && markedCounts <= 21) {
    //   return (
    //     <Image
    //       src={matchedGame?.result_images[2]}
    //     />
    //   )
    // } else if (markedCounts >= 22 && markedCounts <= 25) {
    //   return (
    //     <Image
    //       src={matchedGame?.result_images[3]}
    //     />
    //   )
    // }
  };

  const replayGame = () => {
    toggleResultImage(false);
    // dispatch(resetCounts());
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
            />
          </BoardFrame>
          {
            showResultImage &&
            <div className="result-image" style={{marginTop: -5}}>
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
                    size="10px"
                    marginRight="5px"
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
                    size="12.5px"
                    marginRight="5px"
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
                  size="10px"
                  marginRight="5px"
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
                  size="12.5px"
                  marginRight="10px"
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
    width: 175px;
    height: 40px;
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);
    
    @media ${breakPoints.web} {
        height: 70px;
        border-radius: 50px;
    }
`;

const RestartButton = styled(SaveButton)`
    display: flex;
    width: 105px;
    background: ${pointColor.white};
    
`;

const Message = styled.p`
    margin-top: 0;
    font-size: 12px;
    color: ${pointColor.gray8};
    
    @media ${breakPoints.web} {
        font-size: 25px;
    }
`;

const ButtonText = styled.p`
    font-size: 14px;
    font-weight: bold;
    color: ${({color}) => color || pointColor.white};
    
    @media ${breakPoints.web} {
        font-size: 18px;
    }
`;

const ResultContent = styled.div`
    width: 100%;
    background: ${pointColor.white};
    padding: 15px 15px 20px 15px;
`;

const ResultButton = styled.div`
    margin-top: 10px;
    width: 70%;
    height: 40px;
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
    padding-top: 5px;
    padding-bottom: 35px;
    border-bottom: 1px solid ${pointColor.gray1};
`;

const ResultButtonFrame = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`;

const BoardFrame = styled.div`
    position: absolute;
    top: ${({width}) => ((width - 36) * 0.30) + 5}px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    
    @media ${breakPoints.web} {
    }
    
`;

const ContainerFrame = styled.div`
    width: 100%;
    padding: 0 18px;
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
