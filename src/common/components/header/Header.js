import styled from "styled-components";
import {mobile, pointColor, Layout, Image} from "common/theme/theme";
import {useRouter} from "next/router";

export default function Header({leftContent, title, titleContent, rightContent, children, withoutBackButton, backButtonColor, onPressBackButton, ...others}) {
    const router = useRouter();
    return (
        <ContainerFrame {...others}>
            {leftContent ? (
                    <LeftContentFrame>{leftContent || null}</LeftContentFrame>
                ) :
                <Image
                    width={mobile(170)}
                    height={mobile(40)}
                    cover
                    src={"/static/images/logo/bingobingo_logo.png"}
                />

            }

            <CenterContentFrame>
                {titleContent ||
                (title ? (
                    <HeaderTitle>{title}</HeaderTitle>
                ) : null)}
            </CenterContentFrame>

            <RightContentFrame>{rightContent || null}</RightContentFrame>
        </ContainerFrame>
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
    border-bottom: ${({withoutBorder}) => (withoutBorder ? 0 : mobile(1))}
        solid ${pointColor.gray1};
`;