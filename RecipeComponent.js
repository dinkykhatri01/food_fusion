import React from "react";
import styled from "styled-components";

export const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  box-shadow: 0 3px 10px 0 #aaa;
  width: 300px;
`;

export const CoverImage = styled.img`
  height: 200px;
`;

export const RecipeName = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin: 10px 0;
`;

export const IngredientsText = styled.span`
  font-size: 18px;
  border: solid 2px green;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  color: green;
  text-align: center;
  margin-bottom: 12px;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    font-weight: bold;
  }
`;

export const SeeMoreText = styled(IngredientsText)`
  border: solid 2px red;
  color: red;
`;

const RecipeComponent = (props) => {
  return (
    <RecipeContainer>
      <CoverImage src="hamburger.svg" />
      <RecipeName>Matar Paneer</RecipeName>
      <IngredientsText>Ingredients</IngredientsText>
      <SeeMoreText>See Complete Recipe</SeeMoreText>
    </RecipeContainer>
  );
};

export default RecipeComponent;
