export default {
    template:`
    <header className="main-header">
        <div className="logo">
            <a href="#/">Miss Books</a>
        </div>
        <nav class="main-nav">
            <router-link to="/">Home</router-link>
            <router-link to="/book">Books</router-link>
            <router-link to="/about">About</router-link>
        </nav>
    </header>
    `,
}