<nav class="bar bar-tab">
	<a class="tab-item external active" v-for="btn in buttons" :class="btn.cls" @click="btn.clickFn"> 
		<span v-if="btn.icon" class="icon" :class="btn.icon"></span>
		<span class="tab-label">{{btn.text}}</span>
	</a> 
</nav>