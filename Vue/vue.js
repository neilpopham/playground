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
		template: '<div><p id="card{{card.id }}">{{ card.value }}</p></div>'
	}
)

Vue.component(
	'Cards',
	{
		props: ['cards'],
		template: '<div><p>Cards</p><Card v-for="item in cards" v-bind:card="item" v-bind:key="item.number" /></div>'
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