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
      <ImageFrame type="short">
        <Image
          cover
          src={game.board}
        />
      </ImageFrame>
      <ContentFrame type="short">
        <Title style={{fontSize: 20}}>
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
      <ImageFrame>
        <Image
          cover
          src={game.thumbnail}
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
                contain
                src={`/static/images/icons/share.svg`}
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

const StartButton = styled.div`
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);
`;

const ShareButton = styled(StartButton)`
    display: flex;
    background: ${pointColor.white};
    width: 46px;
    height: 46px;
    border-radius: 50%;
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
`;

const ContentFrame = styled.div`
    background: ${pointColor.white};
    padding: 18px 16px 22px 16px;
    display: ${({type}) => type === "short" ? "flex" : "block"};
    justify-content: ${({type}) => type === "short" ? "space-between" : "flex-start"};
    align-items: ${({type}) => type === "short" ? "center" : "flex-start"}; 
`;

const ImageFrame = styled.div`
    width: ${({width}) => width ? (width - 60) + "px" : 100 + "%"};
    height: ${({width, type}) => type === "short" ? "250px": width ?  ((width - 60) * 1.25) + "px" : "100%"};
    overflow: hidden;
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
