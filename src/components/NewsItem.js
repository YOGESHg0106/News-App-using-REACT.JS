import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageURL,newsURL,author,date,source} = this.props;
    return (
      <div>
        <div className="card" style={{width: "22rem"}}>
          <img src={imageURL?imageURL:"https://www.searchenginejournal.com/wp-content/uploads/2022/06/image-search-1600-x-840-px-62c6dc4ff1eee-sej.png"} className="card-img-top" alt="..."/>
          <div className="card-body">
          <h5 className="card-title">{title}....<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{source}</span></h5>
          <p className="card-text"> {description}....</p>
          <p className="card-text"><small classNamw="text-body-secondary">By {author? author: "Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={newsURL} target='blank' className="btn btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
