<div class="list-block media-list" :id="id">
	<ul>
		<li v-if="empty" class="empty-list"><div>暂无数据!</div></li>
		<li v-for="row in rows" :class="row.cls" @click="clickFn(row)">
			<a class="item-link item-content" v-link="row.href || href">
			    <div class="item-media">
			        <img :class="row.imgs.cls" :src="row.imgs.src">
			    </div>
				<div class="item-inner">
					<div class="item-title-row" v-for="l in row.labels">
						<div class="item-subtitle" :class="l.cls">{{l.title}}<span class="icon" :class="i.cls" v-for="i in l.icon"></span></div>
						<div class="item-after" :class="l.afterCls">{{l.after}}</div>
					</div>
				</div>
			</a>
		</li>
	</ul>
</div>