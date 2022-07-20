import { useEffect, useState } from 'react'
import Card from '../../components/common/card/Card.tsx'
import DatePicker from '../../components/common/date-picker/DatePicker.tsx'
import Select from '../../components/common/select/SelectDropdown.tsx'
import { format } from 'date-fns'
import {
  DashboardEnumSelectTitles,
  DashboardEnumCardTitles,
  DashboardEnumError,
  DashboardEnumDateFormat,
} from './Dashboard.enum.ts'
import { DashboardNumberOfResultsOptionsList } from './Dashboard.list.ts'

const Dashboard = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [articles, setArticles] = useState([])

  const today = new Date()
  const yesterday = today.setDate(today.getDate() - 1)

  const [date, setDate] = useState(new Date(yesterday))
  const [formattedDate, setFormattedDate] = useState(
    format(new Date(yesterday), DashboardEnumDateFormat.FORMAT),
  )

  const [articleCount, setArticleCount] = useState(100)
  const [results, setResults] = useState(articles ? articles.slice(0, 100) : [])

  const [countryCode, setCountryCode] = useState('All')
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
        sorted.unshift({ label: 'All', value: 'All' })
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

    const url =
      countryCode === 'All'
        ? `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${formattedDate}`
        : `https://wikimedia.org/api/rest_v1/metrics/pageviews/top-per-country/${countryCode}/all-access/${formattedDate}`

    /* fetch articles */
    const fetchArticles = () => {
      // fetch data
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            setError(
              `${DashboardEnumError.ERROR} ${res.status} ${res.statusText}, ${DashboardEnumError.MESSAGE}`,
            )
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
    setFormattedDate(format(new Date(e), DashboardEnumDateFormat.FORMAT))
  }

  const handleCountChange = (e) => {
    setArticleCount(parseInt(e.target.value))
  }

  const handleCountryCodeChange = (e) => {
    console.log(e.target.value)
    setCountryCode(e.target.value)
  }

  return (
    <div className="tw-container tw-p-4 tw-space-y-3">
      <div className="tw-flex tw-space-x-14 tw-justify-center tw-flex-wrap">
        <DatePicker
          handleDateChange={handleDateChange}
          date={date}
          maxDate={today}
          title={DashboardEnumSelectTitles.START_DATE}
        />
        <div className="tw-w-40">
          <Select
            handleSelectChange={handleCountryCodeChange}
            defaultValue={'All'}
            title={DashboardEnumSelectTitles.COUNTRY}
            options={countries}
          />
        </div>
        <Select
          handleSelectChange={handleCountChange}
          defaultValue={articleCount}
          title={DashboardEnumSelectTitles.NUMBER_OF_RESULTS}
          options={DashboardNumberOfResultsOptionsList}
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
          {results.map((article) => {
            const secondaryValue =
              article?.views?.toLocaleString('en-US') ||
              article?.views_ceil?.toLocaleString('en-US')
            const title = `${article.rank}. ${article.article.split('_').join(' ')}`

            return (
              <Card
                key={article.article}
                title={title}
                secondaryTitle={DashboardEnumCardTitles.VIEWS}
                secondaryValue={secondaryValue}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dashboard
