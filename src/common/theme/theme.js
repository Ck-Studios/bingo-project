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
    gray7: "#333333",
    gray8: "#6E6D79",
    gray9: "#6E6D79",
    gray10: "#999999",
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
    NaverPost: "#01beff",

    mainPurple: "#764AFF",
    gradientPurple: "#9C57FF",
    wallColor: "#F5F5F9",
};

export const breakPoints = {
    web: "screen and (min-width: 768px)",
    mobile: "screen and (max-width: 767px)"
};

export const Image = styled.img`
    width: ${({width}) => width || '100%'};
    height: ${({height}) => height || '100%'};
    object-fit: ${({cover}) => cover ? 'cover' : 'contain'};
`;

export const mobile = value => `${(value / 720) * 100}vw`;
export const desktop = value => `${(value / 720) * 1000}px`;

export const IconFrame = styled.div`
    width: ${({size}) => size || '18px'};
    height: ${({size}) => size || '18px'};
    margin-top: ${({marginTop}) => marginTop || 0};
    margin-right: ${({marginRight}) => marginRight || 0};
    margin-bottom: ${({marginBottom}) => marginBottom || 0};
    margin-left: ${({marginLeft}) => marginLeft || 0};
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Layout = {
    header: mobile(96),
    tabBar: mobile(98),
    hasHomeBar: mobile(170),
    indent: mobile(32)
};
