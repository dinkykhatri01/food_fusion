import React, { useState, useEffect } from "react";
import Axios from "axios";
import styled from "styled-components";
import Header from "./components/HeaderComponent";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ReactPlayer from 'react-player';
import {
  RecipeContainer,
  CoverImage,
  IngredientsText,
  SeeMoreText,
  RecipeName,
} from "./components/RecipeComponent";

const APP_ID = "c9ce6bc3";
const APP_KEY = "53ddd5dcf25986e27432b076f71a548a";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

const Placeholder = styled.img`
  width: 100%;
  height: 100%;
`;

const FeedbackButton = styled.button`
  background-color: #4CAF50;
  border: 2px solid black;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const MinuteFilterContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const MinuteFilterLabel = styled.label`
  margin-right: 10px;
  width: 160px; /* Set a fixed width for label */
`;

const MinuteFilterInput = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const WelcomeAudioButton = styled.button`
  background-color: #007bff;
  border: 2px solid #007bff;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
`;

const RecipeComponent = (props) => {
  const { recipeObj } = props;
  const [show, setShow] = useState(false);
  
  return (
    <>
      <Dialog open={show}>
        <DialogTitle id="alert-dialog-slide-title">Ingredients</DialogTitle>
        <DialogContent>
          <table>
            <thead>
              <tr>
                <th>Ingredients</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              {recipeObj.ingredients.map((ingredientObj, index) => (
                <tr key={index}>
                  <td>{ingredientObj.text}</td>
                  <td>{ingredientObj.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <IngredientsText onClick={() => window.open(recipeObj.url)}>See complete recipe</IngredientsText>
          <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
        </DialogActions>
      </Dialog>
      <RecipeContainer>
        <CoverImage src={recipeObj.image} />
        <RecipeName>{recipeObj.label}</RecipeName>
        <IngredientsText onClick={() => setShow(true)}>Ingredients</IngredientsText>
        <SeeMoreText onClick={() => window.open(recipeObj.url)}>See Complete Recipe</SeeMoreText>
      </RecipeContainer>
    </>
  );
};

function App() {
  const [timeoutId, updateTimeoutId] = useState();
  const [recipeList, updateRecipeList] = useState([]);
  const [minCookingTime, setMinCookingTime] = useState(0);
  const [maxCookingTime, setMaxCookingTime] = useState(0);
  const [playWelcomeAudio, setPlayWelcomeAudio] = useState(false);
  const [isTilted, setIsTilted] = useState(false);

  useEffect(() => {
    const handleTilt = (event) => {
      setIsTilted(event.gamma > 10 || event.gamma < -10);
    };

    window.addEventListener("deviceorientation", handleTilt);

    return () => {
      window.removeEventListener("deviceorientation", handleTilt);
    };
  }, []);

  useEffect(() => {
    if (isTilted) {
      // Fetch random recipes here
      const fetchRandomRecipes = async () => {
        const response = await Axios.get(
          `https://api.edamam.com/search?q=random&app_id=${APP_ID}&app_key=${APP_KEY}`
        );
        updateRecipeList(response.data.hits);
      };

      fetchRandomRecipes();
    }
  }, [isTilted]);

  const fetchRecipe = async (searchString) => {
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}&time=${minCookingTime}-${maxCookingTime}`
    );
    updateRecipeList(response.data.hits);
  };

  const onTextChange = (event) => {
    clearTimeout(timeoutId);
    const timeout = setTimeout(() => fetchRecipe(event.target.value), 700);
    updateTimeoutId(timeout);
  };

  const handleMinCookingTimeChange = (event) => {
    setMinCookingTime(event.target.value);
  };

  const handleMaxCookingTimeChange = (event) => {
    setMaxCookingTime(event.target.value);
  };

  const handleFeedbackClick = () => {
    window.location.href = "http://127.0.0.1:5500/feedback.html";
  };

  const handleWelcomeAudioClick = () => {
    setPlayWelcomeAudio(!playWelcomeAudio);
  };

  return (
    <Container>
      <Header.Container>
        <Header.AppNameComponent>
          <Header.AppIcon src="hamburger.svg" />
          Food Fusion
        </Header.AppNameComponent>
        <Header.SearchComponent>
          <Header.SearchIcon src="/search-icon.svg" />
          <Header.SearchInput
            placeholder="Search Recipe"
            onChange={onTextChange}
          />
        </Header.SearchComponent>
        <MinuteFilterContainer>
          <MinuteFilterLabel>Min Cooking Time (min):</MinuteFilterLabel>
          <MinuteFilterInput type="number" onChange={handleMinCookingTimeChange} />
        </MinuteFilterContainer>
        <MinuteFilterContainer>
          <MinuteFilterLabel>Max Cooking Time (min):</MinuteFilterLabel>
          <MinuteFilterInput type="number" onChange={handleMaxCookingTimeChange} />
        </MinuteFilterContainer>
        <WelcomeAudioButton onClick={handleWelcomeAudioClick}>
          {playWelcomeAudio ? "Pause Audio" : "what is food fusion ? "}
        </WelcomeAudioButton>
      </Header.Container>
      <RecipeListContainer>
        {recipeList.length ?
          recipeList.map((recipeObj, index) => (
            <RecipeComponent key={index} recipeObj={recipeObj.recipe} />
          )) :
          <Placeholder src="foodfusion.PNG" />
        }
      </RecipeListContainer>
      {playWelcomeAudio && (
        <ReactPlayer url="welcome.mp3" playing controls />
      )}
      <FeedbackButton onClick={handleFeedbackClick}>Feedback</FeedbackButton>
    </Container>
  );
}

export default App;
