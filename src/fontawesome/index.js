/* Set up using Vue 2 */
import Vue from 'vue'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faPen,
  faPlus,
  faMinus,
  faChevronDown,
  faTrashAlt,
  faTimes
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faPen, faPlus, faMinus, faChevronDown, faTrashAlt, faTimes)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)