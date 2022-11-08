<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input 
        type="text"
        class="form-control"
        placeholder="Buscar entrada"
        v-model="term"
      />
    </div>

    <div class="entry-scrollarea">
      <Entry
        v-for="entry in entriesByTerm"
        :key="entry.id"
        :entry="entry" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    Entry: defineAsyncComponent(() => import('../components/Entry.vue'))
  },
  data() {
    return {
      term: ''
    }
  },
  computed: {
    ...mapGetters('journal',[
      'getEntryByTerm'
    ]),
    entriesByTerm() {
      return this.getEntryByTerm(this.term)
    }
  }
}
</script>
<style lang="scss" scoped>
input{
  height: 25px;
}
  .entry-list-container {
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px);
  }

  .entry-scrollarea {
    height: calc(100vh - 119px);
    overflow: scroll;
    overflow-x: hidden;
  }
</style>
