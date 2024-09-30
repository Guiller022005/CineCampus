// store.js
import { reactive } from 'vue';

export const store = reactive({
    user: null,
    login(email) {
        this.user = { email };
    },
    logout() {
        this.user = null;
    }
});