  <div class="content-padded grid-demo" :id="id">
    <div class="row no-gutter no-gutter-table">
      <div :class="row.cls || cls" v-for="row in rows"><div class="col-tit">{{row.title}}</div><div class="col-con">{{row.value}}</div></div>
    </div>
  </div>