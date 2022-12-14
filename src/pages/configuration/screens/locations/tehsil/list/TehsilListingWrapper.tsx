import React from 'react'
import TehsilListing from './TehsilListing'

const tehsils = [
  'Depalpur',
  'Hatod',
  'Indore',
  'Mhow',
  'Sawer',
]

const TehsilListingWrapper = () => {
  return (
    <TehsilListing
      tehsils={tehsils}
    />
  )
}

export default TehsilListingWrapper
