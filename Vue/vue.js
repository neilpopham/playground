const Counter = {
  data() {
    return {
      counter: 0
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000)
  }
}

Vue.createApp(Counter).mount('#counter');

const TodoItem = {
  template: `<li>This is a todo</li>`
}

// Create Vue application
const app = Vue.createApp({
  components: {
    TodoItem // Register a new component
  }
})

// Mount Vue application
app.mount('#todo');

const Card = {
	props: ['card'],
	template: '<p>Card number is {{ card.number }}</p>'
}

const Cards = {
	props: ['cards'],
	components: { Card },
	template: '<div><p>Cards {{cards.length}} </p><ul id="example-1"><li v-for="c in cards" :key="c.id">{{ c.number }} foo</li></ul><Card v-for="card in cards" v-bind:card="card" v-bind:key="card.id" /></div>'
}

const cards = Vue.createApp({
  components: { Card, Cards },
  data() {
    return {
      cards: [
			{ id: 0, number: '1' },
			{ id: 1, number: '2' },
			{ id: 2, number: '3' },
			{ id: 3, number: '5' },
			{ id: 4, number: '8' },
			{ id: 5, number: '13' },
		]
    }
  },
}).mount('#cards');
/*

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id: 0, text: 'Vegetables' },
      { id: 1, text: 'Cheese' },
      { id: 2, text: 'Whatever else humans are supposed to eat' }
    ]
  }
})

Vue.component(
	'Card',
	{
		props: ['card'],
		template: '<div><p :id="card.id">{{ card.value }}</p></div>'
	}
)

Vue.component(
	'Cards',
	{
		props: ['cards'],
		template: '<div><p>Cards {{cards.length}} </p><ul id="example-1"><li v-for="c in cards" :key="c.id">{{ c.number }}</li></ul><Card v-for="card in cards" v-bind:card="card" v-bind:key="card.number" /></div>'
	}
)

var cards = new Vue({
	el: '#cards',
	data: {
		cards: [
			{ id: 0, number: '1' },
			{ id: 1, number: '2' },
			{ id: 2, number: '3' },
			{ id: 3, number: '5' },
			{ id: 4, number: '8' },
			{ id: 5, number: '13' },
		]
	}
})

*/