import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";
import wordsToNumbers from "words-to-numbers";

const alanKey =
  "01d4c776711572766f686c77ce8c982a2e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
  const classes = useStyles();

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle(
            (prevActiveArticle) => prevActiveArticle + 1
          );
        } else if (command === "open") {
          const parsedNumbers =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;

          const article = articles[parsedNumbers - 1];

          if (parsedNumbers > 20)
            alanBtn().playText("Please try that again.");
          else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://miro.medium.com/max/600/1*CJyCnZVdr-EfgC27MAdFUQ.jpeg"
          className={classes.alanLogo}
          alt="alan logo"
        />
      </div>
      <NewsCards
        articles={newsArticles}
        activeArticle={activeArticle}
      />
    </div>
  );
};

export default App;
