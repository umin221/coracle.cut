  <div class="list-block list-group-block" v-for="row in rows">
    <div class="content-block-title" :class="row.titcls" @click="clickTitleFn(row, $event)">{{row.title}}</div>
    <ul v-show="!row.content">
      <li class="item-content item-content-notalign" :class="row.cls" v-link="label.href || href" v-for="label in row.labels">
        <div class="item-media item-media-icon" v-if="label.icon"><i class="icon icon-f7" :class="label.icon"></i></div>
        <div class="item-inner" :class="label.cls">
          <div class="item-title">{{label.title}}</div>
          <div class="item-after" v-if="label.after">{{label.after}}</div>
          <div class="item-group" v-if="label.afterGroup"><div class="item-after-group" v-for="item in label.afterGroup"><span>{{item}}</span></div><div>
        </div>
      </li>
    </ul>
  </div>
