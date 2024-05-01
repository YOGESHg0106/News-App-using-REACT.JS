import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

  constructor(){
    super();
    this.state={
      articles:[],
      loading: false,
      page:1
    }
  } 

  async componentDidMount(){
    // eslint-disable-next-line 
    let url ='https://newsapi.org/v2/top-headlines?country=us&apiKey=222e0077045448b78b316f19592627f1&page=1&pageSize=${this.props.pageSize}';
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData= await data.json()
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})
  }

  HandlePrevClick= async()=>{
    // eslint-disable-next-line 
    let url ='https://newsapi.org/v2/top-headlines?country=us&apiKey=222e0077045448b78b316f19592627f1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}';
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData= await data.json()

    this.setState({
      page: this.state.page - 1,
      articles:parsedData.articles,
      loading: false
    })

  }


  HandleNextClick= async()=>{
    if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      // eslint-disable-next-line
      let url ='https://newsapi.org/v2/top-headlines?country=us&apiKey=222e0077045448b78b316f19592627f1&page=${this.state.page + 1 }&pageSize=${this.props.pageSize}';
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData= await data.json()

      this.setState({
        page: this.state.page + 1,
        articles:parsedData.articles,
        loading: false
      })
  }
}

  render() {
    return (
      <div className='container my-6'>
        <h1 className='text-center'>NewsApp- Top Headlines</h1>
        {this.state.loading &&<Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title?element.title.slice(0,30):""} 
              description={element.description?element.description.slice(0,90):""} 
              imageURL={element.urlToImage} newsURL={element.url} 
              author={element.author} 
              date={element.publishedAt} 
              source={element.source.name}/>
            </div>
          })}
        </div>
        <div class="d-flex justify-content-between">
          <button disabled={this.state.page<=1} class="btn btn-dark" type="button" onClick={this.HandlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} class="btn btn-dark" type="button" onClick={this.HandleNextClick}> Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
