<div class="list-block" :id="id">
	<ul v-for="rows in datas">
		<!-- Text inputs -->
		<li v-link="row.href" v-for="row in rows" :class="row.cls">
			<div class="item-content">
				<div class="item-media">
					<i class="icon" :class="row.icon"></i>
				</div>
				<div class="item-inner">
					<div v-if="row.label" class="item-title label">{{row.label}}</div>
					<div class="item-input">
						<!-- inputs type suport -->
						<input v-if="row.type=='text' || row.type=='date' || row.type=='password' || row.type=='email'"
							:class="row.disabled"
							:type="row.type"
							:placeholder="row.placeholder"
							v-model="row.value" />
						<input type="text" v-if="row.type=='calendar'" data-toggle="calendar" />
						<label v-if="row.type=='switch'" class="label-switch"
							:class="row.disabled">
							<input type="checkbox"
								:value="row.value"
								:checked="row.checked">
							<div class="checkbox"></div>
						</label>
						<textarea v-if="row.type=='textarea'"
							:class="row.disabled"
							:placeholder="row.placeholder"
							:value="row.value"></textarea>
						<select v-if="row.type=='select'"
							:class="row.disabled"
							:value="row.value">
							<option v-for="o in row.option">{{o}}</option>
						</select>
						<div v-if="row.type=='div'" class="item-ellipsis">
                            {{row.value}}
                        </div>
                        <div v-if="row.type=='single'" class="item-form-single" @click="clickFn(row)">
                            {{row.value}}
                        </div>
					</div>
				</div>
			</div>
		</li>
	</ul>
</div>