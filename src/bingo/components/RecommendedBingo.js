import styled from "styled-components";
import ContentCard from "main/components/card/ContentCard";
import {mobile, pointColor, Image, breakPoints} from "common/theme/theme";
import {useRouter} from "next/router";

export default function RecommendedBingo(props) {
    const router = useRouter();
    return (
        <ContainerFrame>
            <Title>
                추천 빙고
            </Title>
            <ContentListFrame>
                {
                    [1, 2, 3, 4, 5].map((item, index) => (
                        <ItemFrame
                            key={index.toString()}
                            onClick={() => router.push("/bingo")}
                        >
                            <ContentCard
                                type="short"
                            />
                        </ItemFrame>
                    ))
                }
            </ContentListFrame>
        </ContainerFrame>
    )
}

const Title = styled.p`
    font-size: ${mobile(35)};
    color: ${pointColor.gray7};
    font-weight: 700;
`;

const ItemFrame = styled.div`
    margin-top: ${mobile(30)};
    @media ${breakPoints.web} {
        margin-top: 3rem;
    }
`;

const ContentListFrame = styled.div`
   
`;

const ContainerFrame = styled.div`
    margin-top: ${mobile(50)};
    padding: 0 ${mobile(50)};
    
    @media ${breakPoints.web} {
        padding: 0 80px;
    }
`;
