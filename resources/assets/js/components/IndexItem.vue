<template>
  <div>
    <div v-for="(item, index) in mediaItems" v-bind:key="item.category + index">
      <div class="thumbnail">
        <img
          v-bind:src="item.thumbnail"
          v-bind:alt="item.title + '-thumbnail'"
          style="width: 300px; height:auto"
        />
      </div>
      <div class="info">
        <div>{{ item.title }}</div>
        <div v-if="item.tagArray">
          {{ item.start }}〜{{ item.end }}
          <span
            v-for="tag in item.tagArray"
            v-bind:key="item + '.' + tag"
            class="tag"
          >{{ tag }}</span>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mediaItems: Array
  }
};
</script>
