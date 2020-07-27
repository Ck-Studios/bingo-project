import styled from "styled-components";
import {mobile, pointColor} from "../../theme/theme";
import {SNS_LIST} from "../../scheme/common";
import Link from "next/link";

export default function Share(props) {
  const sendKakao = async() => {
    console.log("실행됨?");
    const _flag = await Kakao.isInitialized();
    if(_flag) {
      await Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "집순이 집돌이 빙고: 집에만 있어도 행복해!",
          description: "#빙고 #집순이 #집돌이",
          imageUrl: "http://drive.google.com/uc?export=view&id=1YLyzgEC9SsZRpXcgTrRxdhY0fg7nh3Lz",
          link: {
            mobileWebUrl: "http://192.168.1.136:3000",
            webUrl: "http://192.168.1.136:3000",
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
              mobileWebUrl: "http://192.168.1.136:3000",
              webUrl: "http://192.168.1.136:3000",
            },
          },
          {
            title: '앱으로 보기',
            link: {
              mobileWebUrl: "http://192.168.1.136:3000",
              webUrl: "http://192.168.1.136:3000",
            },
          },
        ],
        success: function(response) {
          console.log("success", response);
        },
        fail: function(error) {
          console.log("error", error);
        }
      });
      console.log("종료됨?");
    }
  };


  return (
    <Container>
      <Title>빙고를 친구에게 공유하세요!</Title>
      <RowFrame>
        {
          SNS_LIST.map((sns, index) => (
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
          ))
        }
      </RowFrame>
    </Container>
  )
}

const SNSTitle = styled.p`
    font-size: 12px;
    color: ${pointColor.gray3};
`;

const Title = styled.p`
    font-size: 16px;
    font-weight: 700;
    color: ${pointColor.mainPurple};
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
`;

const SNSIconFrame = styled.img`
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: ${({background}) => background || "transparent"};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    
`;

