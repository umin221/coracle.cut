<div class="swiper-flow-list flow-list list-block" :id="id">
	<ul class="flow-ul">
	    <!-- 获取所有的相应的data.json内容，依次循环，其中一个，包含所有字段-->
		<li class="flow-li" v-for="row in rows">

			<div class="item-container">

				<div @click="clickFn(row)" :style="aStyle">
					<div class="flow-mark bg-blue"  v-show="row.state=='not_start'">
						<div style="background-color: #0a8ddf;"></div>
					</div>
					<div class="flow-mark-yellow"  v-show="row.state=='running'">
						<div></div>
					</div>
					<div class="flow-mark-green"  v-show="row.state=='end'">
						<div></div>
					</div>

					<div class="flow-content-block" v-for="l in row.labels">
						<div :class="l.cls" style="color: #131313;font-size: 15px;">{{l.title}}</div>
						<div class="item-after button button-Meeting" v-show="l.after=='会议'">{{l.after}}</div>
						<div class="item-after button button-Schedule" v-show="l.after=='日程'">{{l.after}}</div>
					</div>
				</div>

				<div class="item-operation" style="    font-size: 17px;">
					<div class="item-buttons" v-for="btn in row.buttons" :class="btn.cls" >
						<div :style="btnStyle" @click="buttonFn(btn, row)">{{btn.text}}</div>
					</div>
				</div>

			</div>
		</li>
	</ul>
</div>