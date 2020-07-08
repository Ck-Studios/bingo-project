import styled from "styled-components";
import {pointColor, Layout, mobile, Image, breakPoints, IconFrame, desktop} from "common/theme/theme";
import {useSelector} from "react-redux";
import {PREFIX} from "client/constants";
import {useState, useEffect} from "react";

export default function ContentCard(props) {
  const {game} = props;
  console.log("hihi, ", game);
  const [clientWidth, setClientWidth] = useState(null);

  useEffect(() => {
    if (window) {
      setClientWidth(window.innerWidth);
    }
  }, []);

  return props.type === "short" ?
    <ShortContainerFrame>
      <ImageFrame type="short" width={clientWidth}>
        <Image
          cover
          src={game.boardTheme.boardImage}
        />
      </ImageFrame>
      <ContentFrame type="short">
        <Title style={{fontSize: 18}}>
          {game.title}
        </Title>
        <Image
          className="next-icon"
          width="12.5px"
          height="12.5px"
          src={`/static/images/icons/next.svg`}
        />
      </ContentFrame>
    </ShortContainerFrame>
    :
    <ContainerFrame>
      <ImageFrame>
        <Image
          contain
          src={game.boardTheme.boardImage}
        />
      </ImageFrame>
      <ContentFrame>
        <Title>
          {game.title}
        </Title>
        <ButtonFrame>
          <StartButton>
            <IconFrame
              marginRight="5px"
            >
              <Image
                src={`/static/images/icons/play.svg`}
              />
            </IconFrame>
            <ButtonText>
              시작하기
            </ButtonText>
          </StartButton>
          <ShareButton>
            <IconFrame
              marginRight="5px"
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
      </ContentFrame>
    </ContainerFrame>
}

const ButtonText = styled.p`
    font-size: 1rem;
    font-weight: bold;
    color: ${({color}) => color || pointColor.white};
`;

const StartButton = styled.div`
    padding: 10px 0;
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    flex: 3;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);
`;

const ShareButton = styled(StartButton)`
    display: flex;
    flex: 2;
    background: ${pointColor.white};
    
`;

const ButtonFrame = styled.div`
    display: flex;
    margin-top: 20px;
`;

const Title = styled.p`
    font-size: 1.4rem;
    font-weight: bold;
    color: ${pointColor.gray7};
`;

const ContentFrame = styled.div`
    background: ${pointColor.white};
    padding: 15px 20px;
    display: ${({type}) => type === "short" ? "flex" : "block"};
    justify-content: ${({type}) => type === "short" ? "space-between" : "flex-start"};
    align-items: ${({type}) => type === "short" ? "center" : "flex-start"}; 
`;

const ImageFrame = styled.div`
    width: ${({width}) => (width - 60)}px;
    height: ${({width}) => ((width - 60) * 1.25)}px;
`;

const ContainerFrame = styled.div`
    width: 100%;
    overflow: hidden;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.23);
`;

const ShortContainerFrame = styled(ContainerFrame)`
    height: 300px;
    border: 1px solid ${pointColor.white};
`;
