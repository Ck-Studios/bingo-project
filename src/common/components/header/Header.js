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
//     src={`${PREFIX}/static/images/logo/logo.svg`}
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
                                        width={mobile(115)}
                                        height={mobile(40)}
                                        contain
                                        src={`${PREFIX}/static/images/logo/logo.svg`}
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
    width: ${mobile(35)};
    height: ${mobile(35)};
    background: pink;
`;

const CenterContentFrame = styled.div`
    display: flex;
    justify-content: center;
    align-self: stretch;
    align-items: center;
    position: absolute;
    top: 50%;
    left: ${Layout.indent};
    right: ${Layout.indent};
    transform: translateY(-50%);
    z-index: 0;
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
    z-index: 100;
    height: ${mobile(100)};
    padding: ${Layout.indent};
    background: ${({background}) => background || pointColor.white};
    border-bottom: ${({withoutBorder}) => (withoutBorder ? 0 : mobile(1))} solid ${pointColor.gray1};
`;

const Wrapper = styled.div`
    @media ${breakPoints.web} {
        .header-container-frame {
            height: ${desktop(100)};
            padding: 30px;
            .logo {
                width: ${desktop(100)};
                height: ${desktop(30)};
                object-fit: contain;
            }
        }
    }
`;
