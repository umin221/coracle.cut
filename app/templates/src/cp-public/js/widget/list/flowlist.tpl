<div class="flow-list" :id="id">
	<ul class="flow-ul">
		<li class="flow-li" v-for="row in rows">
			<a v-link="row.href">
			    <div class="flow-mark" :class="row.cls" v-if="row.cls"><div></div></div>
			    <div class="flow-content-block" v-for="l in row.labels">
			        <div :class="l.cls">{{l.title}}</div>
			        <div class="item-after" :class="l.aftercls">{{l.after}}</div>
			    </div>
			</a>
		</li>
	</ul>
</div>