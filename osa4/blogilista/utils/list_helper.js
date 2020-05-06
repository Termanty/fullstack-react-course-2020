const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, likes) => sum + likes
  return blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length ===  0) {
    return undefined
  }
  const reducer = (favorite, blog) => {
    return blog.likes > favorite.likes
      ? blog
      : favorite
  }
  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  if ( blogs.length === 0 ) return undefined
  const sumBlogsByAuthor = (authorsArray, blog) => {
    const item = authorsArray.find(item => item.author === blog.author)
    if (item === undefined) {
      authorsArray.push({ author: blog.author, blogs: 1 })
    } else {
      item.blogs++
    }
    return authorsArray
  }
  const blogSumByAuthorList = blogs.reduce(sumBlogsByAuthor, [])

  const authorWithMostBlogs = (most, author) => most.blogs > author.blogs ? most : author
  return blogSumByAuthorList.reduce(authorWithMostBlogs)
}

const mostLikes = (blogs) => {
  if ( blogs.length === 0 ) return undefined
  const allLikesForAuthor = (authorsArray, blog) => {
    const item = authorsArray.find(item => item.author === blog.author)
    if (item === undefined) {
      authorsArray.push({ author: blog.author, likes: blog.likes })
    } else {
      item.likes += blog.likes
    }
    return authorsArray
  }
  const allLikesForAuthorList = blogs.reduce(allLikesForAuthor, [])

  const authorWithMostLikes = (most, author) => most.likes > author.likes ? most : author
  return allLikesForAuthorList.reduce(authorWithMostLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

