const { createRouter, createWebHashHistory } = VueRouter

import homePage from "../views/home-page.cmp.js"
import aboutPage from "../views/about-page.cmp.js"
import booksApp from "../views/books-app.cmp.js"
import bookDetails from "../views/book-details.cmp.js"
import bookAdd from "../views/book-add.cmp.js"

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: homePage
        },
        {
            path: '/book',
            component: booksApp,

        },
        {

            path: '/book-add',
            component: bookAdd,
        }
        ,

        {
            path: '/book/:id',
            component: bookDetails
        },
        {
            path: '/about',
            component: aboutPage
        },
        {
            path: '/',
            component: aboutPage
        },
    ]
}

export const router = createRouter(routerOptions)