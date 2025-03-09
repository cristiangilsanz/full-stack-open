const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const mostLiked = blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav), blogs[0])

    return { title: mostLiked.title, author: mostLiked.author, likes: mostLiked.likes}
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorCounts = _.countBy(blogs, 'author')
    const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author])

    return { author: topAuthor, blogs: authorCounts[topAuthor] }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    const likesByAuthor = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc;
    }, {});

    const topAuthor = _.maxBy(_.keys(likesByAuthor), (author) => likesByAuthor[author]);

    return {
        author: topAuthor,
        likes: likesByAuthor[topAuthor]
    };
};


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}