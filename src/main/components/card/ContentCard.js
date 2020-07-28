import styled from "styled-components";
import {pointColor, Layout, mobile, Image, breakPoints, IconFrame, desktop} from "common/theme/theme";
import {useState, useEffect} from "react";
import {MAX_CLIENT_WIDTH} from "common/constants/constants";
import {motion} from "framer-motion";

export default function ContentCard(props) {
  const {game} = props;
  const [clientWidth, setClientWidth] = useState(null);

  useEffect(() => {
    if(window) {
      const _clientWidth = window.innerWidth > MAX_CLIENT_WIDTH ? MAX_CLIENT_WIDTH : window.innerWidth;
      console.log("???", _clientWidth);
      const _boardContainerSize = Math.round(_clientWidth * 0.86) + 15;

      setClientWidth(_clientWidth);
    }
  }, []);

  return props.type === "short" ?
    <ShortContainerFrame>
      <ImageFrame type="short" onClick={props.gameStart}>
        <Image
          cover
          src={game?.boardTheme?.boardImage}
        />
      </ImageFrame>
      <ContentFrame type="short">
        <Title style={{fontSize: 20}} onClick={props.gameStart}>
          {game.title}
        </Title>
        <Image
          className="next-icon"
          width="14px"
          height="14px"
          src={`/static/images/icons/next.svg`}
        />
      </ContentFrame>
    </ShortContainerFrame>
    :
    <ContainerFrame>
      <ImageFrame
        onClick={props.gameStart}
        width={clientWidth}
      >
        <Image
          cover
          src={game?.boardTheme?.boardImage}
        />
      </ImageFrame>
      <ContentFrame>
        <Title onClick={props.gameStart}>
          {game?.title}
        </Title>
        <ButtonFrame>
          <StartButton
            whileTap={{ scale: 0.95 }}
          >
            <IconFrame
              marginRight="5px"
            >
              <Image
                src="/static/images/icons/play.svg"
              />
            </IconFrame>
            <ButtonText>
              시작하기
            </ButtonText>
          </StartButton>
          <ShareButton
            whileTap={{ scale: 0.95 }}
            onClick={() => props.showShareModal()}
          >
            <IconFrame
              marginRight="5px"
            >
              <Image
                contain
                src="/static/images/icons/share.svg"
              />
            </IconFrame>
          </ShareButton>
        </ButtonFrame>
      </ContentFrame>
    </ContainerFrame>
}

const ButtonText = styled.p`
    font-size: 16px;
    font-weight: bold;
    color: ${({color}) => color || pointColor.white};
`;

const StartButton = styled(motion.div)`
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);
    
    ${breakPoints.web} {
      height: 54px;    
    }
`;

const ShareButton = styled(StartButton)`
    display: flex;
    background: ${pointColor.white};
    width: 46px;
    height: 46px;
    border-radius: 50%;
    
    ${breakPoints.web} {
      width: 54px;
      height: 54px;
    }
`;

const ButtonFrame = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: space-between;
`;

const Title = styled.p`
    font-size: 22px;
    font-weight: bold;
    color: ${pointColor.gray7};
    
    ${breakPoints.web} {
      font-size: 28px;    
    }
`;

const ContentFrame = styled.div`
    background: ${pointColor.white};
    padding: 18px 16px 22px 16px;
    display: ${({type}) => type === "short" ? "flex" : "block"};
    justify-content: ${({type}) => type === "short" ? "space-between" : "flex-start"};
    align-items: ${({type}) => type === "short" ? "center" : "flex-start"};
    
    ${breakPoints.web} {
      padding: ${({type}) => type === "short" ? "24px 30px 21px" : "26px 30px 32px"};
    } 
`;

const ImageFrame = styled.div`
    width: ${({width}) => width ? (width - 30) + "px" : "100%"};
    height: ${({width, type}) => type === "short" ? "250px": width ? ((width - 60) * 0.75) + "px" : "100%"};
    overflow: hidden;
    
    ${breakPoints.web} {
      width: ${({width}) => width ? (width - 54) + "px" : "100%"};
      height: ${({width, type}) => type === "short" ? "375px": width ? ((width - 40) * 0.75) + "px" : "100%"};
    }
    
`;

const ContainerFrame = styled.div`
    width: 100%;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.16);
`;

const ShortContainerFrame = styled(ContainerFrame)`
   box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.16);
`;
