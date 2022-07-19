import React, { useEffect, useState } from 'react';
import Card from "../../components/common/card/Card.tsx";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/2015/10/10")
      .then(res => res.json())
      .then(
          (data) => {
            setIsLoaded(true);
            setArticles(data && data.items[0].articles);
            console.log(data && data.items[0].articles);
          })
      .catch((error) => {
          setIsLoaded(true);
          setError(error);
      }
    )
  }, [])
  
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        {articles.map(article => (
            <Card key={article.article} title={article.article} views={article.views} />
        ))}
      </div>
    );

  }
}

export default Dashboard;