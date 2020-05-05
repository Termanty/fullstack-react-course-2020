const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')
const { listWithOneBlog, listWithManyBlogs } = require('./test_lists')

test('dummy returns one', () => {
  expect(dummy([])).toBe(1)
})

describe('total likes ', () => {
  test('of empty list is zero', () => {
    expect(totalLikes([])).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of zero blogs is undefined', () => {
    const result = favoriteBlog([])
    expect(result).toEqual(undefined)
  })

  test('when list has only one blog is that blog', () => {
    const result = favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('of bigger list is the blog with most likes', () => {
    const result = favoriteBlog(listWithManyBlogs)
    expect(result).toEqual(listWithManyBlogs[2])
  })
})

describe('most blogs author', () => {


  test('of bigger list is', () => {
    const result = mostBlogs(listWithManyBlogs)
    expect(result).toEqual( { author: "Robert C. Martin", blogs: 3 })
  })
})

describe('author with most likes', () => {


  test('of bigger list is', () => {
    const result = mostLikes(listWithManyBlogs)
    expect(result).toEqual( { author: "Edsger W. Dijkstra", likes: 17 })
  })
})