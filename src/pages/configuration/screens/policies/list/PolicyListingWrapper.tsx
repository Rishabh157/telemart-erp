import React from 'react'
import PolicyListing from './PolicyListing'


const policiesList= [
    {
        label: "Dealers"
    },
    {
        label: "Dealers"
    },
    {
        label: "Dealers"
    },
    {
        label: "Dealers"
    },
]

const PolicyListingWrapper = () => {
  return (
    <>
    <PolicyListing
    policiesList={policiesList}
    />
    </>
  )
}

export default PolicyListingWrapper