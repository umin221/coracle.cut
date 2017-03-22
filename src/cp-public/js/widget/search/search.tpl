<div class="bar search-bar" :id="id">
    <div class="searchbar" :class="cls">
        <a class="searchbar-cancel" @click="btnClickFn()">{{btntext}}</a>
        <div class="search-input">
            <label class="icon" :class="icon" for="search"></label>
            <input @click="iptClickFn()" v-model="key | filter" debounce="500" type="search" id="search" :maxlength="maxlength" placeholder="{{placeholder}}">
        </div>
    </div>
</div>