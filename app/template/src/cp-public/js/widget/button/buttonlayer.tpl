<div class="content-block" :id="id">
	<div class="row">
		<div class="col-50" v-for="btn in buttons">
			<a class="button" :class="btn.cls" @click="btn.clickFn">{{btn.text}}</a>
		</div>
	</div>
</div>