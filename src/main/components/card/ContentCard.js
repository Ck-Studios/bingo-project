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
        <Title style={{fontSize: mobile(36)}}>
          {game.title}
        </Title>
        <Image
          className="next-icon"
          width={mobile(25)}
          height={mobile(25)}
          src={`${PREFIX}/static/images/icons/next.svg`}
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
              marginRight={'5px'}
            >
              <Image
                src={`${PREFIX}/static/images/icons/play.svg`}
              />
            </IconFrame>
            <ButtonText>
              시작하기
            </ButtonText>
          </StartButton>
          <ShareButton>
            <IconFrame
              marginRight={'5px'}
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
      </ContentFrame>
    </ContainerFrame>
}

const ButtonText = styled.p`
    font-size: 1.0rem;
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
    width: ${({width}) => (width - 60)};
    height: ${({width}) => ((width - 60) * 1.25)};
`;

const ContainerFrame = styled.div`
    width: 100%;
    overflow: hidden;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.23);
`;

const ShortContainerFrame = styled(ContainerFrame)`
    height: ${mobile(600)};
    border: ${mobile(1)} solid ${pointColor.white};
`;
