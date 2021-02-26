require('dotenv').config()
const snoowrap = require('snoowrap')

const reddit = new snoowrap({
    userAgent: 'Reddit News Getter',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
})

async function getNews(num) {
    article = new Promise((resolve) => {
        reddit.getSubreddit('news').getHot().then(posts_JSON => {
            let x, posts = [], max = posts_JSON.length

            if (num < posts_JSON.length) {
                max = num 
            } 
            for (x = 0; x < max; x++) {
                posts.push(posts_JSON[x].title + ' ' + posts_JSON[x].url)
            }
            resolve(posts)
        })
    })

    return article
}

async function main() {
    news = await getNews(5)
    news.forEach(article => {console.log(article)})
}

main()