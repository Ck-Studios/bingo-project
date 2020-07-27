import styled from "styled-components";
import {mobile, pointColor, Layout, Image, breakPoints, desktop} from "common/theme/theme";
import {useRouter} from "next/router";
import {PREFIX} from "client/constants";
import {motion} from "framer-motion";

// 로고 이미지 원본
// <Image
//     className="logo"
//     width={mobile(115)}
//     height={mobile(40)}
//     contain
//     src={`/static/images/logo/logo.svg`}
//     onClick={() => router.push("/")}
// />

export default function Header({leftContent, title, titleContent, rightContent, children, withoutBackButton, withoutLogo, backButtonColor, onPressBackButton, ...others}) {
  const router = useRouter();
  return (
    <Wrapper>
      <ContainerFrame {...others} className="header-container-frame">
        {leftContent ? (
          <LeftContentFrame>{leftContent || null}</LeftContentFrame>
        ) : <div/>
        }

        <CenterContentFrame>
          {
            withoutLogo ?
              <div/>
              :
              titleContent ?
                titleContent
                :
                title ? (<HeaderTitle>{title}</HeaderTitle>) :
                  <Image
                    className="logo"
                    width="50px"
                    height="22px"
                    contain
                    src={`/static/images/logo/logo.svg`}
                    onClick={() => router.push("/")}
                  />
          }
        </CenterContentFrame>

        <RightContentFrame>{rightContent || null}</RightContentFrame>
      </ContainerFrame>
    </Wrapper>
  )
}

const HeaderTitle = styled.p`
    font-size: ${mobile(26)};
    font-weight: 500;
    color: ${pointColor.gray3};
    line-height: 1.46;
    text-align: center;
`;

const BackButtonFrame = styled.div`
    width: 17.5px;
    height: 17.5px;
    background: pink;
`;

const CenterContentFrame = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RightContentFrame = styled.div`
    display: flex;
    position: relative;
    z-index: 1;
`;

const LeftContentFrame = styled.div`
    display: flex;
    position: relative;
    z-index: 1;
`;

const ContainerFrame = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: ${({fixed}) => (fixed ? "sticky" : "relative")};
    top: 0;
    z-index: 10;
    background: ${({background}) => background || pointColor.white};
    border-bottom: ${({withoutBorder}) => (withoutBorder ? 0 : 1)}px solid ${pointColor.gray1};
`;

const Wrapper = styled.div`
        .header-container-frame {
            height: 46px;
            .logo {
                width: 60px;
                height: 25px;
                object-fit: contain;
            }
        }
`;
