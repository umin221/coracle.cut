<header class="bar bar-nav bar-header">
	<a class="button button-link button-nav" v-for="btn in buttons" :class="btn.cls" @click="btn.clickFn">
      <span class="icon" :class="btn.icon"></span>
      {{btn.text}}
    </a>
	<h1 class='title'>{{title}}</h1>
</header>