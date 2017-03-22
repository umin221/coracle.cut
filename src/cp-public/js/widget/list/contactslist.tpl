  <div class="list-block contacts-block">
    <div class="list-group" :class="row.cls" v-for="row in rows">
      <ul>
        <li class="list-group-title">{{row.title}}</li>
        <li :class="label.cls" v-for="label in row.labels" @click="clickFn(label, $event)">
          <div class="item-content">
            <div class="item-inner">
              <div class="item-title">{{label.title}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>