import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import Listing from './Listing'
import '../style/Listings.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Listings = (): React.ReactElement => {
  const response = [
    {
      id: 1,
      adType: 2,
      imgPath: '/assets/placeholder.jpg',
      title: 'Electronics Sale',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ante in libero consectetur efficitur. This is sample text and can be changed at a later date.',
      location: 'New York',
      categories: 'Electronics',
      price: 100.99,
      postDate: '2023-12-21'
    },
    {
      id: 2,
      adType: 0,
      imgPath: '/assets/placeholder.jpg',
      title: 'Furniture Clearance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Los Angeles',
      categories: 'Furniture',
      price: 200,
      postDate: '2023-03-12'
    },
    {
      id: 3,
      adType: 1,
      imgPath: '/assets/placeholder.jpg',
      title: 'Fashion Sale',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Chicago',
      categories: 'Clothing',
      price: 300,
      postDate: '2023-03-13'
    },
    {
      id: 4,
      adType: 2,
      imgPath: '/assets/placeholder.jpg',
      title: 'Book Fair',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'San Francisco',
      categories: 'Books',
      price: 150,
      postDate: '2023-03-14'
    },
    {
      id: 5,
      adType: 0,
      imgPath: '/assets/placeholder.jpg',
      title: 'Appliance Sale',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Miami',
      categories: 'Appliances',
      price: 250,
      postDate: '2023-03-15'
    },
    {
      id: 6,
      adType: 1,
      imgPath: '/assets/placeholder.jpg',
      title: 'Sports Equipment Clearance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Seattle',
      categories: 'Sports Equipment',
      price: 180,
      postDate: '2023-03-16'
    },
    {
      id: 7,
      adType: 2,
      imgPath: '/assets/placeholder.jpg',
      title: 'Art Auction',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Boston',
      categories: 'Art',
      price: 280,
      postDate: '2023-03-17'
    },
    {
      id: 8,
      adType: 0,
      imgPath: '/assets/placeholder.jpg',
      title: 'Tool Sale',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Houston',
      categories: 'Tools',
      price: 220,
      postDate: '2023-03-18'
    },
    {
      id: 9,
      adType: 1,
      imgPath: '/assets/placeholder.jpg',
      title: 'Music Instruments Exhibition',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Atlanta',
      categories: 'Music Instruments',
      price: 320,
      postDate: '2023-03-19'
    },
    {
      id: 10,
      adType: 2,
      imgPath: '/assets/placeholder.jpg',
      title: 'Outdoor Gear Clearance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Denver',
      categories: 'Outdoor Gear',
      price: 270,
      postDate: '2023-03-20'
    },
    {
      id: 11,
      adType: 2,
      imgPath: '/assets/placeholder.jpg',
      title: 'TEST Electronics Sale',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et ante in libero consectetur efficitur. This is sample text and can be changed at a later date.',
      location: 'New York',
      categories: 'Electronics',
      price: 100.99,
      postDate: '2023-03-11'
    },
    {
      id: 12,
      adType: 0,
      imgPath: '/assets/placeholder.jpg',
      title: 'TEST Furniture Clearance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Los Angeles',
      categories: 'Furniture',
      price: 200,
      postDate: '2023-03-12'
    },
    {
      id: 13,
      adType: 1,
      imgPath: '/assets/placeholder.jpg',
      title: 'TEST Fashion Sale',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Chicago',
      categories: 'Clothing',
      price: 300,
      postDate: '2023-03-13'
    },
    {
      id: 14,
      adType: 2,
      imgPath: '/assets/placeholder.jpg',
      title: 'TEST Book Fair',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'San Francisco',
      categories: 'Books',
      price: 150,
      postDate: '2023-03-14'
    },
    {
      id: 15,
      adType: 0,
      imgPath: '/assets/placeholder.jpg',
      title: 'TEST Appliance Sale',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Miami',
      categories: 'Appliances',
      price: 250,
      postDate: '2023-03-15'
    },
    {
      id: 16,
      adType: 1,
      imgPath: '/assets/placeholder.jpg',
      title: 'TEST Sports Equipment Clearance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Seattle',
      categories: 'Sports Equipment',
      price: 180,
      postDate: '2023-03-16'
    },
    {
      id: 17,
      adType: 2,
      imgPath: '/assets/placeholder.jpg',
      title: 'TEST Gear Clearance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Boston',
      categories: 'Art',
      price: 280,
      postDate: '2023-03-17'
    },
    {
      id: 18,
      adType: 0,
      imgPath: '/assets/placeholder.jpg',
      title: 'TEST Gear Clearance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Houston',
      categories: 'Tools',
      price: 220,
      postDate: '2023-03-18'
    },
    {
      id: 19,
      adType: 1,
      imgPath: '/assets/placeholder.jpg',
      title: 'TEST Gear Clearance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Atlanta',
      categories: 'Music Instruments',
      price: 320,
      postDate: '2023-03-19'
    },
    {
      id: 20,
      adType: 2,
      imgPath: '/assets/placeholder.jpg',
      title: 'TEST Gear Clearance',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      location: 'Denver',
      categories: 'Outdoor Gear',
      price: 270,
      postDate: '2023-03-20'
    }
  ]

  const [currentPage, setCurrentPage] = useState(0)
  const itemsPerPage = 10

  const handlePageChange = ({ selected }: { selected: number }): void => {
    setCurrentPage(selected)
  }

  const indexOfLastItem = (currentPage + 1) * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = response.slice(indexOfFirstItem, indexOfLastItem)

  const totalResultsText = currentPage === Math.ceil(response.length / itemsPerPage) - 1
    ? `Displaying ${response.length} of ${response.length} results.`
    : `Displaying ${currentItems.length} of ${response.length} results.`
  return (
    <div className='listings'>
      <h2>Listings</h2>
      <div className='page-row'>
        <p className='results'>{totalResultsText}</p>
        <ReactPaginate
          nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
          previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
          pageCount={Math.ceil(response.length / itemsPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
      <div className='list'>
        {currentItems.map(item => (
          <Listing
            key={item.id}
            title={item.title}
            adType={item.adType}
            imgPath={item.imgPath}
            description={item.description}
            location={item.location}
            categories={item.categories}
            price={item.price}
            postDate={item.postDate}
          />
        ))}
      </div>
      <div className='page-row bottom'>
        <ReactPaginate
          nextLabel={<FontAwesomeIcon icon={faArrowRight} />}
          previousLabel={<FontAwesomeIcon icon={faArrowLeft} />}
          pageCount={Math.ceil(response.length / itemsPerPage)}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          forcePage={currentPage}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  )
}

export default Listings
