<div class="list-block media-list" :id="id">
	<ul>
		<li v-if="empty" class="empty-list"><div>暂无数据!</div></li>
		<li v-for="row in rows" :class="row.cls" @click="clickFn(row, $event)">
			<a v-link="row.href || href" class="item-link item-content">
				<div class="item-inner">
					<div class="item-title-row" v-for="l in row.labels">
						<div class="item-subtitle" :class="l.cls">{{l.title}}</div>
						<div class="item-after">{{l.after}}</div>
					</div>
				</div>
			</a>
		</li>
	</ul>
</div>