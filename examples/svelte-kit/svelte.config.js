import adapter from '@sveltejs/adapter-auto'
import {telefunc} from 'telefunc/vite'

const config = {
  adapter: adapter,
  kit: {
    vite: () => ({plugins: [telefunc()]})
  }	
}

export default config