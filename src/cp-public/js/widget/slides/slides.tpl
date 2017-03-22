<div class="swiper-container swiper-container-horizontal" :id="id">
	<div class="swiper-wrapper">
        <div v-for="img in rows" class="swiper-slide" :class="img.imgcls" :style="img.imgstyle" @click="clickFn(img, $event)"><img :src="img.src" alt="" style="width: 100%"></div>
	</div>
	<!-- Add Pagination -->
	<div class="swiper-pagination"></div>
	<!-- Add Arrows -->
	<!--<div class="swiper-button-next"></div><div class="swiper-button-prev"></div>-->
</div>