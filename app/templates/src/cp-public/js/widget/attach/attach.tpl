<div class='attach-container'>
	<div v-if="head && head.title" class="attach-head" :class="head.cls">{{head.title}}</div>
	<ul v-if="showType==1" class="attach-type-1">
		<li v-for="img in imgs" >
			<img :src="img.src || img.imgPath" @click="browseImages($index)"/>
			<span @click="del($index)" class="attach-del-btn" v-if="edit"></span>
		</li>
		<li class="attach-add-btn" @click="openBtn()" v-show="showAddIcon" v-if="edit"></li>
	</ul>
	<ul v-if="showType==2" class="attach-type-2">
		<li v-for="img in imgs" class="attach-li">
			<div class="attach-left">
				<img :src="img.src||img.imgPath" v-show="img.imgPath" @click="browseImages($index)"/>
				<div class="attach-add-btn" @click="openBtn($index)" v-show="!img.imgPath" v-if="edit"></div>
				<span @click="delImg_only($index)" class="attach-del-btn attach-delImg-only" v-show="img.imgPath"></span>
			</div>
			<div class='attach-right'>
				<div>{{img.title}}</div>
				<textarea v-model="img.remark"></textarea>
			</div>
			<!-- <span @click="del($index)" class="attach-del-btn" v-if="edit"></span> -->
		</li>
		<li class="content-block" v-show="showAddIcon" v-if="edit">
			<div class="row">
				<div class="col-100">
					<a class="button button-big button-fill button-success"  @click="add()">添加</a>
				</div>
			</div>
		</li>
	</ul>
	<div class="attach-overlay" v-if="openApp">
		<ul>
			<li @click="open('photo')">拍照</li>
			<li @click="open('imgLibrary')">从相册中选择</li>
			<li style= "background: #eee;height:20px;"></li>
			<li @click="close()">关闭</li>
		</ul>
	</div>
</div>
