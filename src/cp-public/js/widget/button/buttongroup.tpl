<div class="content-block">
    <p class="buttons-row"><a class="button" :class="button.cls" v-for="button in buttons" v-link="button.href" @click="button.clickFn">{{button.text}}</a></p>
</div>