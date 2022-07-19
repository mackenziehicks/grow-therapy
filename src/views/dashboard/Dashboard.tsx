import React, { useEffect, useState } from 'react';
import Card from "../../components/common/card/Card.tsx";
import DatePicker from "../../components/common/date-picker/DatePicker.tsx";
import { format } from "date-fns";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  
  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);

  const [date, setDate] = useState(new Date(yesterday));
  const [formattedDate, setFormattedDate] = useState(format(new Date(yesterday), 'yyyy/MM/dd'));

  const fetchArticles = () => {
    // reset loading state
    if (isLoaded) {
      setIsLoaded(false);
    }

    // fetch data
    fetch(`https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${formattedDate}`)
      .then(res => res.json())
      .then(
          (data) => {
            setIsLoaded(true);
            setArticles(data && data.items && data.items[0].articles);
          })
      .catch((error) => {
          setIsLoaded(true);
          setError(error);
      }
    )
  };

  useEffect(() => {
    fetchArticles();
  }, [formattedDate])

  const handleDateChange = (e) => {
    setDate(e);
    setFormattedDate(format(new Date(e), 'yyyy/MM/dd'));
  }
  
  if (!isLoaded) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>Error: {error.message}</div>
  } else {
    return (
      <div>
        <DatePicker handleDateChange={handleDateChange} date={date} maxDate={today} />
        {articles.map(article => (
            <Card key={article.article} title={article.article} views={article.views} />
        ))}
      </div>
    );

  }
}

export default Dashboard;