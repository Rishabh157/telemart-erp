import React from 'react'
import CountryListing from './CountryListing'

const countries = [
  "India",
  "Nepal",
  "Bhutan",
  "Bangladesh",
  "India",
  "Nepal",
  "Bhutan",
  "Bangladesh",
  "India",
  "Nepal",
  "Bhutan",
  "Bangladesh",
  "India",
  "Nepal",
  "Bhutan",
  "Bangladesh",

]

const CountryListingWrapper = () => {
  return (
    <CountryListing
      countries={countries}
    />
  )
}

export default CountryListingWrapper
