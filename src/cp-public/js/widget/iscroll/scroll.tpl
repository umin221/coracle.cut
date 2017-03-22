<div class="content" :id="id">
	<div class="pull-to-refresh-layer" v-if="refresh">
		<div class="preloader"></div>
		<div class="pull-to-refresh-arrow"></div>
	</div>
	<slot></slot>
	<div class="infinite-scroll-preloader" v-if="infinite && hasload">
		<div class="preloader">
		</div>
		<span>正在加载</span>
	</div>
</div>