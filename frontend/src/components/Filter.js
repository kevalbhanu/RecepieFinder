import React from 'react'
import '../Filter.css'

export default function Filter({tags,onFilterChange}) {
    const handleTagChange = (event)=>{
        onFilterChange({type:'tag',value:event.target.value});
    }
  return (
    <div className='filter'>
      <div className='filter-container'>
        <label className='filter-label' htmlFor="tag">Tag:</label>
        <select className='filter-select' id="tag" onChange={handleTagChange}>
          <option value="">All</option>
          {tags.map((tag, index) => (
            <option key={index} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
