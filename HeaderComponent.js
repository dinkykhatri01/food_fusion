import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0); /* Transparent background */
`;


const AppNameComponent = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 30px;
`;

const AppIcon = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const SearchComponent = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;

`;

const SearchInput = styled.input`
  padding: 15px 20px; /* Increase padding */
  font-size: 20px; /* Increase font size */
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const HeaderComponent = {
  Container,
  AppNameComponent,
  AppIcon,
  SearchComponent,
  SearchIcon,
  SearchInput,
};

export default HeaderComponent;
