import React from 'react'
import BatchListing from './BatchListing'
import ConfigurationLayout from 'src/pages/configuration/ConfigurationLayout'

const BatchLisitngWrapper = () => {
  return (
    <div>
      <ConfigurationLayout>
      <BatchListing/>
      </ConfigurationLayout>
    </div>
  )
}

export default BatchLisitngWrapper
