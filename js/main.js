const { createApp } = Vue
import { router } from "./router/router.js"

import appHeader from "./cmps/app-header.cmp.js"
import appFooter from "./cmps/app-footer.cmp.js"
import userMsg from "./cmps/user-msg.cmp.js"

const options = {
    template: `
    <app-header/>
    <router-view/>
    <app-footer/>
    <Transition name="bounce">
        <user-msg/>
    </Transition>
    `,
    components: {
        appHeader,
        appFooter,
        userMsg,
    }
}

const app = createApp(options)

app.use(router)
app.mount('#app')