<div class="ktc-menu list-block media-list" v-show="show" :id="id">
    <div class="preloader-indicator-overlay" @click="toggle($event)"></div>
    <nav class="bar bar-tab">
        <a class="tab-item external" v-for="row in rows" @click="clickFn(row, $event)" href="#">
            <span class="icon">
                <img class="width40 radius30" :src="row.icon" />
            </span>
            <span class="tab-label">{{row.text}}</span>
        </a>
    </nav>
</div>