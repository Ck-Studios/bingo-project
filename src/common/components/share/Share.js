import styled from "styled-components";
import {breakPoints, mobile, pointColor} from "../../theme/theme";
import {SNS_LIST} from "../../scheme/common";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import Head from "next/head"
import Link from "next/link";
import {useRouter} from "next/router";
import {BASE_URL} from "client/constants";

export default function Share(props) {
  console.log("props.game ::: ", props.game);
  const url = window?.location?.href + "bingo?id=" + props?.game?.id;
  const sendKakao = async () => {
    console.log("실행됨?");
    const _flag = await Kakao.isInitialized();
    if (_flag) {
      await Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: props?.game?.title,
          description: "#빙고링",
          imageUrl: props?.game?.thumbnail,
          link: {
            mobileWebUrl: BASE_URL + "/" + props?.game?.id,
            webUrl: BASE_URL + "/" + props?.game?.id,
          }
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845,
        },
        buttons: [
          {
            title: '웹으로 보기',
            link: {
              mobileWebUrl: BASE_URL + "/" + props?.game?.id,
              webUrl: BASE_URL + "/" + props?.game?.id,
            },
          },
        ],
        success: function (response) {
          console.log("success", response);
        },
        fail: function (error) {
          console.log("error", error);
        }
      });
      console.log("종료됨?");
    }
  };

  const FaceBookMetaData = () => {
    return (
      <Head>
        <meta property="og:url" content={`${BASE_URL + "/" + props?.game?.id}`}/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="세상의 모든 빙고 빙고링"/>
        <meta property="og:description" content="빙고링 테스트"/>
        <meta property="og:image" content={`${props?.game?.thumbnail}`}/>
      </Head>
    )
  };

  const clickLink = (link) => {
    window.open(link)
  };


  return (
    <>
      <FaceBookMetaData/>
      <Container>
        <Title>빙고를 친구에게 공유하세요!</Title>
        <RowFrame>
          {
            SNS_LIST.map((sns, index) => {
                return index === 3 ?
                  <CopyToClipboard text={url}>
                    <SNSFrame
                      onClick={() => props.onCopyUrl()}
                      key={index.toString()}
                      index={index}
                    >
                      <SNSIconFrame
                        background={sns.background}
                        src={sns.image}
                      />
                      <SNSTitle>
                        {sns.sns}
                      </SNSTitle>
                    </SNSFrame>
                  </CopyToClipboard>
                  :
                  <SNSFrame
                    key={index.toString()}
                    index={index}
                    data-href={`${BASE_URL + "/" + props?.game?.id}`}
                    onClick={sns.link ? () => clickLink(sns.link) : () => sendKakao()}
                  >
                    <SNSIconFrame
                      background={sns.background}
                      src={sns.image}
                    />
                    <SNSTitle>
                      {sns.sns}
                    </SNSTitle>
                  </SNSFrame>
              }
            )
          }
        </RowFrame>
      </Container>
    </>
  )
}

const SNSTitle = styled.p`
    font-size: 12px;
    color: ${pointColor.gray3};
    ${breakPoints.web} {
      margin-top: 12px;
      font-size: 14px;
    }
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: 700;
    color: ${pointColor.mainPurple};
    ${breakPoints.web} {
      font-size: 18px;
    }
`;

const RowFrame = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 20px;
`;

const SNSFrame = styled.a`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: ${({index}) => index > 0 ? 32 : 0}px;
    ${breakPoints.web} {
      font-size: 14px;
      margin-left: ${({index}) => index > 0 ? 34 : 0}px;
    }   
`;

const SNSIconFrame = styled.img`
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: ${({background}) => background || "transparent"};
    
    ${breakPoints.web} {
      width: 54px;
      height: 54px;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;    
`;

