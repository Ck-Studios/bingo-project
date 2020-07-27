import BingoContainer from "bingo/containers/BingoContainer";
import ContainerLayout from "common/components/layout/ContainerLayout";
import AnimationFrame from "common/animation/AnimationFrame";


export default function Index() {
  return (
    <ContainerLayout>
      <AnimationFrame>
        <BingoContainer/>
      </AnimationFrame>
    </ContainerLayout>
  )
}
