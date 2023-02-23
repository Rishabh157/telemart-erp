import React from 'react'
import AreaListing from './AreaListing'

const areas = [
  'Tilak Nagar',
  'Samvid Nagar ',
  'Saket Nagar',
  'Bangali',
  'Patrakar Nagar',
]

const AreaListingWrapper = () => {
  return (
    <AreaListing
      areas={areas}
    />
  )
}

export default AreaListingWrapper
