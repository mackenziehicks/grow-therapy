import { useEffect, useState } from 'react';
import Card from "../../components/common/card/Card.tsx";
import DatePicker from "../../components/common/date-picker/DatePicker.tsx";
import Select from "../../components/common/select/SelectDropdown.tsx"
import { format } from "date-fns";

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  
  const today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);

  const [date, setDate] = useState(new Date(yesterday));
  const [formattedDate, setFormattedDate] = useState(format(new Date(yesterday), 'yyyy/MM/dd'));

  const [articleCount, setArticleCount] = useState(100);
  const [results, setResults] = useState(articles.slice(0, 100));

  useEffect(() => {
    const fetchArticles = () => {
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
    
    fetchArticles();
  }, [formattedDate])

  useEffect(() => {
    setResults(articles.slice(0, articleCount));
  }, [articles, articleCount])

  const handleDateChange = (e) => {
    setDate(e);
    // reset loading state
    if (isLoaded) {
      setIsLoaded(false);
    }
    setFormattedDate(format(new Date(e), 'yyyy/MM/dd'));
  }

  const handleCountChange = (e) => {
    setArticleCount(parseInt(e.target.value));
  }
  
  if (!isLoaded) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>Error: {error.message}</div>
  } else {
    return (
      <div className="tw-max-w-lg tw-mx-auto tw-container tw-p-4 tw-space-y-3">
        <div className="tw-flex tw-space-x-14">
          <DatePicker handleDateChange={handleDateChange} date={date} maxDate={today} title='Start date:' />
          <Select handleSelectChange={handleCountChange} defaultValue={articleCount} title="Number of Results" options={[25, 50, 75, 100, 200]} />
        </div>
        <div className="tw-flex tw-flex-col tw-space-y-5">
          {results.map((article) => (
            <Card key={article.article} title={article.article.split('_').join(' ')} secondaryTitle="Views:" secondaryValue={article.views.toLocaleString("en-US")} />
          ))}
        </div>
      </div>
    );

  }
}

export default Dashboard;