import styled from "styled-components";
import {useEffect} from "react";
import {breakPoints, mobile, pointColor} from "../../theme/theme";
import {SNS_LIST} from "../../scheme/common";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import Head from "next/head"
import Link from "next/link";
import {useRouter} from "next/router";
import _ from "lodash";
import {BASE_URL} from "client/constants";

export default function Share(props) {
  const url = window?.location?.href + "bingo?id=" + props?.game?.id;
  const sendKakao = async () => {
    try {
      const _flag = await Kakao.isInitialized();
      if (_flag) {
        await Kakao.Link.sendDefault({
          objectType: "feed",
          content: {
            title: props?.game?.title,
            description: "#빙고링",
            imageUrl: props?.game?.thumbnail,
            link: {
              mobileWebUrl: BASE_URL + "/bingo?id=" + props?.game?.id,
              webUrl: BASE_URL + "/bingo?id=" + props?.game?.id,
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
                mobileWebUrl: BASE_URL + "/bingo?id=" + props?.game?.id,
                webUrl: BASE_URL + "/bingo?id=" + props?.game?.id,
              },
            },
          ],
          success: function (response) {
            console.log("success", response);
          },
          fail: function (error) {
            throw new Error(error);
          }
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const sendFacebook = () => {
    // window.open("http://www.facebook.com/sharer.php?u=" + encodeURIComponent(BASE_URL + "/bingo?id=" + props?.game?.id),"_blank")
    FB?.ui({
      method: "share",
      href: BASE_URL + "/bingo?id=" + props?.game?.id
    }, function(response) {
      console.log(response)

    })
  };

  // https://twitter.com/intent/tweet?url=https%3A%2F%2Fkr.vonvon.me%2FMsbj8&text=2092%EB%85%84+%EC%9A%B4%EB%AA%85+%ED%85%8C%EC%8A%A4%ED%8A%B8&hashtags=vonvon_kr+%232092%EB%85%84%EC%9A%B4%EB%AA%85%ED%85%8C%EC%8A%A4%ED%8A%B8&related=None

  const sendTwitter = () => {
    // window.open("https://publish.twitter.com/oembed?url=" + `${BASE_URL + "/bingo?id=" + props?.game?.id}`, "_blank");
    const url = `https://twitter.com/intent/tweet?url=${BASE_URL + "/bingo?id=" + props?.game?.id}&text=${props?.game?.title}&hashtags=빙고링+%23${_.snakeCase(props?.game?.title)}`;
    window.open(url, "_blank");
  };

  const insertMeta = () => {
    const meta = `
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@빙고링" />
        <meta name="twitter:creator" content="@빙고링" />
        <meta property="og:url" content=\`${BASE_URL + "/bingo?id=" + props?.game?.id}\`/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content=\`${props?.game?.title}\`/>
        <meta property="og:description" content="빙고링"/>
        <meta property="og:image" content=\`${props?.game?.thumbnail}\`/>
        <meta property="og:app_id" content="1015774698842581" />
    `

    document.getElementsByTagName('head')[0].append(meta);

  }

  useEffect(() => {
    // insertMeta();
  }, []);

  const TwitterMetaData = () => {
    return (
      <Head>
        <meta property="og:title" content={props?.game?.title}/>
        <meta property="og:url" content={`${BASE_URL + "/bingo?id=" + props?.game?.id}`}/>
        <meta property="og:description" content="description" />
        <meta property="og:image" content={`${props?.game?.thumbnail}`}/>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@빙고링" />
        <meta name="twitter:creator" content="@빙고링" />
      </Head>
    )
  }

  const FaceBookMetaData = () => {
    return (
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@빙고링" />
        <meta name="twitter:creator" content="@빙고링" />
        <meta property="og:url" content={`${BASE_URL + "/bingo?id=" + props?.game?.id}`}/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={props?.game?.title}/>
        <meta property="og:description" content="빙고링"/>
        <meta property="og:image" content={`${props?.game?.thumbnail}`}/>
        <meta property="og:app_id" content="1015774698842581" />
      </Head>
    )
  };

  const clickLink = (link) => {
    window.open(link)
  };

  const renderButton = (sns, index) => {
    if (index === 0) {
      return (
        <SNSFrame
          key={index.toString()}
          index={index}
          onClick={() => sendKakao()}
        >
          <SNSIconFrame
            background={sns.background}
            src={sns.image}
          />
          <SNSTitle>
            {sns.sns}
          </SNSTitle>
        </SNSFrame>
      )
    }
    if (index === 1) {
      return (
        <SNSFrame
          key={index.toString()}
          onClick={() => sendFacebook()}
          index={index}
          className="fb-share-button"
          dataHref={`${BASE_URL + "/" + props?.game?.id}`}
          dataLayout="button_count"
        >
          <SNSIconFrame
            background={sns.background}
            src={sns.image}
          />
          <SNSTitle>
            {sns.sns}
          </SNSTitle>
        </SNSFrame>
      )
    }

    if (index === 2) {
      return (
        <SNSFrame
          key={index.toString()}
          index={index}
          onClick={() => sendTwitter()}
        >
          <SNSIconFrame
            background={sns.background}
            src={sns.image}
          />
          <SNSTitle>
            {sns.sns}
          </SNSTitle>
        </SNSFrame>
      )
    }
    if (index === 3) {
      return (
        <CopyToClipboard text={url} key={index.toString()}>
          <SNSFrame
            onClick={() => props.onCopyUrl()}
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
      )
    }
  }


  return (
    <>
      <Container>
        <Title>빙고를 친구에게 공유하세요!</Title>
        <RowFrame>
          {
            SNS_LIST.map((sns, index) => {
                return renderButton(sns, index)
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

