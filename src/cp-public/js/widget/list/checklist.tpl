<div class="list-block media-list">
	<ul>
		<li v-for="row in rows" @click="clickFn(row)">
			<label class="label-checkbox item-content"> 
				<input :type="row.type" :name="row.name" :data-index="$index">
				<div class="item-media">
					<i class="icon icon-form-checkbox"></i>
				</div>
				<div class="item-inner">
					<div class="item-title-row" v-for="l in row.labels">
						<div class="item-subtitle" :class="l.cls">{{l.title}}</div>
						<div class="item-after">{{l.after}}</div>
					</div>
				</div>
			</label>
		</li>
	</ul>
</div>
