import styled from "styled-components";

export const pointColor = {
    black: "#000000",
    white: "#ffffff",
    gray0: "#f7f7fa",
    gray1: "#e6e8ed",
    gray2: "#9da1a8",
    gray3: "#52565d",
    gray4: "#33363b",
    gray5: "#202225",
    gray6: "#484848",
    mainColor: "#0067ff",
    activeColor: "#003cff",
    activeColorLight: "#e5f0ff",
    activeColorGray: "#f7f7fa",
    yellowLight: "#ffe368",
    orangeLight: "#ff9d5a",
    redLight: "#eb8276",
    greenLight: "#8bdb8e",
    blueLight: "#5e9fff",
    purpleLight: "#c189f9",

    pastelBlue: "#dde9ff",

    yellow: "#ffd400",
    orange: "#ff7326",
    red: "#fa4238",
    green: "#02c639",
    blue: "#0067ff",
    purple: "#9727f1",

    yellowDark: "#ffbf00",
    orangeDark: "#ff5300",
    redDark: "#d41100",
    greenDark: "#01a31d",
    blueDark: "#003ffc",
    skyBlue: "#01beff",
    purpleDark: "#7b00e0",
    deepBlue: "#0d33a2",

    Instagram: "#9727f1",
    NaverBlog: "#02c639",
    Facebook: "#0d33a2",
    Youtube: "#e4594a",
    KakaoStory: "#fbc800",
    NaverPost: "#01beff"
};

export const Image = styled.img`
    width: ${({width}) => width || '100%'};
    height: ${({height}) => height || '100%'};
    object-fit: ${({cover}) => cover ? 'cover' : 'contain'};
`;

export const mobile = value => `${(value / 720) * 100}vw`;

export const Layout = {
    header: mobile(96),
    tabBar: mobile(98),
    hasHomeBar: mobile(170),
    indent: mobile(32)
};
