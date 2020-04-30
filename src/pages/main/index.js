import MainContainer from "main/containers/MainContainer";
import ContainerLayout from "common/components/layout/ContainerLayout";
import AnimationFrame from "common/animation/AnimationFrame";

export default function Index() {
    return (
        <ContainerLayout>
            <AnimationFrame>
                <MainContainer/>
            </AnimationFrame>
        </ContainerLayout>
    )
}
