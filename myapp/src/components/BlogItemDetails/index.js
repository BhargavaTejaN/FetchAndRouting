import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogItemDetails extends Component {
  state = {
    blogsData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    console.log(this.props)
    try {
      const {match} = this.props
      const {params} = match
      const {id} = params
      const url = `https://apis.ccbp.in/blogs/${id}`
      const options = {
        method: 'GET',
      }
      const response = await fetch(url, options)
      const data = await response.json()

      // console.log(data)

      const updatedData = {
        title: data.title,
        imageUrl: data.image_url,
        content: data.content,
        avatarUrl: data.avatar_url,
        author: data.author,
      }
      this.setState({blogsData: updatedData, isLoading: false})
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

  renderBlogsData = () => {
    const {blogsData} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogsData

    return (
      <div className="blog-info">
        <h1 className="blog-details-title">{title}</h1>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="blog-container">
        {isLoading ? this.renderLoader() : this.renderBlogsData()}
      </div>
    )
  }
}

export default BlogItemDetails
