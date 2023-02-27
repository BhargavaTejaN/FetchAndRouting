import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem/index'

import './index.css'

class BlogList extends Component {
  state = {
    blogsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogsList()
  }

  getBlogsList = async () => {
    try {
      const url = `https://apis.ccbp.in/blogs`
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()
      //   console.log(data)
      const updatedData = data.map(eachData => ({
        author: eachData.author,
        avatarUrl: eachData.avatar_url,
        id: eachData.id,
        imageUrl: eachData.image_url,
        title: eachData.title,
        topic: eachData.topic,
      }))
      this.setState({blogsList: updatedData, isLoading: false})
    } catch (error) {
      console.log(`DB Error : ${error.message}`)
    }
  }

  renderLoader = () => {
    const {isLoading} = this.state
    return (
      <div data-testid="loader">
        <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
      </div>
    )
  }

  renderBlogList = () => {
    const {blogsList} = this.state
    return (
      <ul className="blogs-list">
        {blogsList.map(eachItem => (
          <BlogItem details={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="blogs-list-container">
        {isLoading ? this.renderLoader() : this.renderBlogList()}
      </div>
    )
  }
}

export default BlogList
