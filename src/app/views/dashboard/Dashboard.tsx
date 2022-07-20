import { useEffect, useState } from 'react'
import Card from '../../components/common/card/Card.tsx'
import DatePicker from '../../components/common/date-picker/DatePicker.tsx'
import Select from '../../components/common/select/SelectDropdown.tsx'
import { format } from 'date-fns'

const Dashboard = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [articles, setArticles] = useState([])

  const today = new Date()
  const yesterday = today.setDate(today.getDate() - 1)

  const [date, setDate] = useState(new Date(yesterday))
  const [formattedDate, setFormattedDate] = useState(format(new Date(yesterday), 'yyyy/MM/dd'))

  const [articleCount, setArticleCount] = useState(100)
  const [results, setResults] = useState(articles ? articles.slice(0, 100) : [])

  const [countryCode, setCountryCode] = useState(null)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    /* Get list of country codes*/
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        const codes = data.map((country) => {
          return { label: country.name.common, value: country.cca2 }
        })

        const sorted = [...codes].sort((a, b) => a.label.localeCompare(b.label))
        sorted.unshift({ label: 'All', value: null })
        setCountries(sorted)
      })
      .catch((error) => {
        setError(error)
      })
  }, [])

  useEffect(() => {
    if (isLoaded) {
      setIsLoaded(false)
    }
    if (error) {
      setError(null)
    }
    const url = countryCode
      ? `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${countryCode}/all-access/${formattedDate}`
      : `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${formattedDate}`

    /* fetch articles */
    const fetchArticles = () => {
      // fetch data
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            setError(`Error: ${res.status} ${res.statusText}, Please try another country or date!`)
          }
          return res.json()
        })
        .then((data) => {
          setIsLoaded(true)
          setArticles(data && data.items && data.items[0].articles)
        })
        .catch((error) => {
          setIsLoaded(true)
          setError(error)
        })
    }

    fetchArticles()
  }, [formattedDate, countryCode])

  useEffect(() => {
    setResults(articles?.slice(0, articleCount))
  }, [articles, articleCount])

  const handleDateChange = (e) => {
    setDate(e)
    // reset loading state
    setFormattedDate(format(new Date(e), 'yyyy/MM/dd'))
  }

  const handleCountChange = (e) => {
    setArticleCount(parseInt(e.target.value))
  }

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value)
  }

  return (
    <div className="tw-container tw-p-4 tw-space-y-3">
      <div className="tw-flex tw-space-x-14 tw-justify-center tw-flex-wrap">
        <DatePicker
          handleDateChange={handleDateChange}
          date={date}
          maxDate={today}
          title="Start date:"
        />
        <div className="tw-w-40">
          <Select
            handleSelectChange={handleCountryCodeChange}
            defaultValue="all"
            title="Country"
            options={countries}
          />
        </div>
        <Select
          handleSelectChange={handleCountChange}
          defaultValue={articleCount}
          title="Number of Results"
          options={[
            { value: 25, label: 25 },
            { value: 50, label: 50 },
            { value: 75, label: 75 },
            { value: 100, label: 100 },
            { value: 200, label: 200 },
          ]}
        />
      </div>
      {!isLoaded && (
        <div>
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div>
          <p className="tw-text-red-400">{error}</p>
        </div>
      )}
      {isLoaded && !error && results && (
        <div className="tw-flex tw-flex-col tw-space-y-5 tw-max-w-xl tw-mx-auto">
          {results.map((article) => (
            <Card
              key={article.article}
              title={article.article.split('_').join(' ')}
              secondaryTitle="Views:"
              secondaryValue={
                article?.views?.toLocaleString('en-US') ||
                article?.views_ceil?.toLocaleString('en-US')
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
