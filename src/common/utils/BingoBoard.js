import {useState, useEffect} from "react";
import _ from "lodash";
import styled from "styled-components";
import {mobile, pointColor, breakPoints} from "common/theme/theme";

export default function BingoCreator(props) {
    const [board, updateBoard] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const size = props.size ? Math.pow(props.size) : 25;
        const _tempArray = [];
        for(let i = 0; i < size; ++i) {
            _tempArray[i] = i+1;
        }

        const _tempArray2 = _tempArray?.map((item, index) => {
            return {
                id: index + 1,
                marked: false,
            }
        });

        _tempArray2.sort(() => 0.5 - Math.random());

        const _tempArray3 = _.chunk(_tempArray2, 5);

        updateBoard(_tempArray3);
        setLoading(false);
    }, []);

    const markItem = (id) => {
        const _tempBoard = board.map(row => {
            return row.map(item => {
                return item.id === id ?
                    Object.assign({}, item, {marked: !item.marked})
                    :
                    item;
            })
        });

        console.log(id, _tempBoard);

        updateBoard(_tempBoard);
    };


    return isLoading ?
        null
        :
        (
            <ContainerFrame>
                {
                    board?.map((row, rowIndex) => (
                        <RowFrame key={rowIndex.toString()}>
                            {
                                row?.map((item, itemIndex) => (
                                    <BingoItem
                                        onClick={() => markItem(item.id)}
                                        key={itemIndex.toString()}
                                        index={itemIndex + 1}
                                        marked={item.marked}
                                    >
                                        <p>{item.id}</p>
                                    </BingoItem>
                                ))
                            }
                        </RowFrame>
                    ))
                }
            </ContainerFrame>
        )
}

const BingoItem = styled.div`
    width: ${mobile(100)};
    height: ${mobile(100)};
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${({marked}) => marked ? "pink" : pointColor.white};
    border: ${mobile(1)} solid red;
    margin-right: ${({index}) => index % 5 !== 0 ? -1 : 0}px;
`;

const RowFrame = styled.div`
    display: flex;
`;

const ContainerFrame = styled.div`
    width: 100%;
    height: 100%;
`;
