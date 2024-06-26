// Documentation for the LibraryOn API is https://libraryon.org/api-docs/v1
// Library services available at https://api-geography.librarydata.uk/rest/libraryauthorities

import { readFileSync, writeFileSync } from 'fs'

const librarySources = [
  './data/libraries1.json',
  './data/libraries2.json',
  './data/libraries3.json',
  './data/libraries4.json'
]
const libraryDestination = './public/libraries.min.json'

const servicesSource = './data/services.json'
const servicesDestination = './public/services.min.json'

const regionsDestination = './public/regions.min.json'

const libraries = []
for (const librarySource of librarySources) {
  const libraryData = readFileSync(librarySource, 'utf8')
  const libraryArray = JSON.parse(libraryData).libraries
  libraries.push(...libraryArray)
}

const servicesData = readFileSync(servicesSource, 'utf8')
const servicesArray = JSON.parse(servicesData)

const processedRegionsArray = servicesArray.map(item => item.region)
const uniqueRegions = [...new Set(processedRegionsArray)]
const processedRegionsData = JSON.stringify(uniqueRegions)
writeFileSync(regionsDestination, processedRegionsData, 'utf8')

const processedServicesArray = servicesArray.map(item => {
  const { nice_name: name, region } = item
  return [name, uniqueRegions.indexOf(region)]
})

const processedServicesData = JSON.stringify(processedServicesArray)
writeFileSync(servicesDestination, processedServicesData, 'utf8')

const processedLibraryArray = libraries.map(item => {
  const {
    name,
    data_entry: { library_id: id, service_id: serviceId, longitude, latitude }
  } = item
  return [
    id,
    name,
    servicesArray.findIndex(service => service.code === serviceId),
    Math.round(longitude * 1e4) / 1e4,
    Math.round(latitude * 1e4) / 1e4
  ]
})

const processedLibraryData = JSON.stringify(processedLibraryArray)
writeFileSync(libraryDestination, processedLibraryData, 'utf8')
