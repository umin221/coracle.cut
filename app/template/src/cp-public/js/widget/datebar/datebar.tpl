<div :id="id">
<div class="content-block" style="margin: 0;padding: 0;overflow-y: scroll;" :style="{width: hwidth + 'px' }">
    <ul class="knd-component-progressbar knd-progressBar-purple" style="height: 90px;margin: 0;padding: 0;" :style="{width: width + 'px' }">
        <li class="datedata" :class="[row.cls, row.active]" day="" state="true" v-for="row in rows" @click="clickFn(row, $event)">
            <span class="progressbar-year">{{row.year}}</span>
            <span class="progressbar-week">{{row.week}}</span>
            <span class="progressbar-data">{{row.data}}</span>
        </li>

    </ul>
</div>
</div>