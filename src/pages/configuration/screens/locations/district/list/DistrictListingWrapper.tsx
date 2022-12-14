import React from 'react'
import DistrictListing from './DistrictListing'

const districts = [
  'Alirajpur',
  'Anuppur',
  'Ashok Nagar',
  'Balaghat',
  'Barwani',
  'Betul',
  'Bhind',
  'Bhopal',
  'Burhanpur',
  'Chhatarpur',
  'Chhindwara',
  'Damoh',
  'Datia',
  'Dewas',
  'Dhar',
  'Dindori',
  'Guna',
  'Gwalior',
  'Harda',
  'Hoshangabad',
  'Indore',
  'Jabalpur',
  'Jhabua',
  'Katni',
  'Khandwa (East Nimar)',
  'Khargone (West Nimar)',
  'Mandla',
  'Mandsaur',
  'Morena',
  'Narsinghpur',
  'Neemuch',
  'Panna',
  'Rewa',
  'Rajgarh',
  'Ratlam',
  'Raisen',
  'Sagar',
  'Satna',
  'Sehore',
  'Seoni',
  'Shahdol',
  'Shajapur',
  'Sheopur',
  'Shivpuri',
  'Sidhi',
  'Singrauli',
  'Tikamgarh',
  'Ujjain',
  'Umaria',
  'Vidisha',
]

const DistrictListingWrapper = () => {
  return (
    <DistrictListing
      districts={districts}
    />
  )
}

export default DistrictListingWrapper
