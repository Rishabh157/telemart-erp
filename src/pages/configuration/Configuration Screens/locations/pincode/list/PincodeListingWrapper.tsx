import React from 'react'
import PincodeListing from './PincodeListing'

const pincodes = [
  '452001',
  '452002 ',
  '452003',
  '452004',
  '452005',
]

const PincodeListingWrapper = () => {
  return (
    <PincodeListing
      pincodes={pincodes}
    />
  )
}

export default PincodeListingWrapper
