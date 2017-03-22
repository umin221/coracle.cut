<div class="list-block media-list todolist" :id="id">
	<ul>
	    <li v-if="nodata" class="empty-list"><div>暂无数据!</div></li>
		<li v-for="row in rows" class="swap-li" :class="row.cls" @click="clickFn(row,$index)">
			<div class="swap-container" :style="{ width: row.width + 'px' }">
			<a class="item-link item-content" v-link="row.href">
			    <div class="item-media">
			        <img :class="row.imgs.cls" :src="row.imgs.src">
			        <div class="item-center" :class="">{{row.imgs.sysName}}</div>
			    </div>
				<div class="item-inner">
					<div class="item-title-row" v-for="l in row.labels">
						<div class="item-subtitle" :class="l.cls">{{l.title}}<span v-if="l.type" class="item-type">[{{l.type}}]</span><span class="icon" :class="i" style="margin-right: 10px;" v-for="i in l.icon"></span></div>
						<div class="item-after" :class="l.aftercls">{{l.after}}</div>
						<span v-if="l.right" class="item-time">{{l.right}}</span>
					</div>
				</div>
			</a>
			<div v-if="row.isRead">
					<div class="item-del-container" v-for="l in row.btns" :class="l.cls" @click="delFn(row)">
						{{l.title}}
					</div>
			</div>
			</div>
		</li>
	</ul>
</div>