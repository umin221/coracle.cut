<!--用于区分buttons-fan和其他tab样式-->
<div v-if="cls!='buttons-fan'" :class="cls">
  <a v-for="row in rows" type-code="{{row.code}}" class="tab-link button" :class="[row.active, row.cls]" :class="row.cls" @click="clickFn(row, $event)"><div>{{row.label}}</div></a>
</div>
<div v-if="cls=='buttons-fan'" class="out-tab-style">
<div :class="cls">
  <a v-for="row in rows" type-code="{{row.code}}" class="tab-link button" :class="[row.active, row.cls]" :class="row.cls" @click="clickFn(row, $event)"><div>{{row.label}}</div></a>
</div>
</div>
<div class="container" :style="containerStyle" v-for="row in rows" v-show="row.active == 'active'">
	<slot :name="row.slot"></slot>
</div>