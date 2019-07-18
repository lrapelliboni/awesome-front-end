<template>
  <div class="table-component">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="filteredUsers">
      <div class="search-box">
        <div class="row">
          <div class="col-md-6">
            <h1>Users</h1>
          </div>
          <div class="col-md-6">
            <div class="form-group has-search">
              <span class="form-control-feedback">
                <font-awesome-icon icon="search" />
              </span>
              <input
                v-model="search"
                type="text"
                class="form-control"
                placeholder="Filter table content"
              />
            </div>
          </div>
        </div>
      </div>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>City</th>
            <th>Ride in group</th>
            <th>Day of the week</th>
            <th>Posts</th>
            <th>Albums</th>
            <th>Photos</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody v-if="filteredUsers.length">
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.username }}</td>
            <td>{{ user.name }}</td>
            <td>
              <a :href="'mailto:' + user.email">{{ user.email }}</a>
            </td>
            <td>{{ user.address.city }}</td>
            <td>{{ makeRandomRideInGroupText() }}</td>
            <td>{{ makeRandomDayOfWeekText() }}</td>
            <td>
              <a href="javascript:void(0);">{{ getPostsFromUser(user.id) }}</a>
            </td>
            <td>
              <a href="javascript:void(0);">{{ getAlbumsFromUser(user.id) }}</a>
            </td>
            <td>{{ getPhotosFromUser(user.id) }}</td>
            <td class="trash">
              <a
                v-confirm="{
                ok: dialog => deleteRow(dialog, user),
                message: 'Are you sure want to remove this item?'
              }"
              >
                <font-awesome-icon icon="trash" />
              </a>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="10">No records found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Table",
  data() {
    return {
      loading: false,
      search: "",
      users: null,
      posts: null,
      albums: null,
      photos: null
    };
  },
  created() {
    this.fetchData();
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.loading = true;
      axios.get("https://jsonplaceholder.typicode.com/users").then(response => {
        this.loading = false;
        this.users = response.data;
      });
      axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
        this.loading = false;
        this.posts = response.data;
      });
      axios
        .get("https://jsonplaceholder.typicode.com/albums")
        .then(response => {
          this.loading = false;
          this.albums = response.data;
        });
      axios
        .get("https://jsonplaceholder.typicode.com/photos")
        .then(response => {
          this.loading = false;
          this.photos = response.data;
        });
    },
    deleteRow: function(dialog, user) {
      let idx = this.users.findIndex(c => c.id == user.id);
      this.users.splice(idx, 1);
      dialog.close();
    },
    makeRandomRideInGroupText() {
      // Mock
      let options = ["Always", "Sometimes", "Never"];
      return options[Math.floor(Math.random() * options.length)];
    },
    makeRandomDayOfWeekText() {
      // Mock
      let options = [
        "Week days",
        "Every day",
        "Weekends",
        "Mon, Wed, Fri",
        "Mon, Tue, Wed",
        "Fri, Sun"
      ];
      return options[Math.floor(Math.random() * options.length)];
    },
    getPostsFromUser(userId) {
      if (this.posts !== null) {
        let posts = this.posts.filter(p => p.userId === userId);
        return posts.length;
      }
      return 0;
    },
    getAlbumsFromUser(userId) {
      if (this.albums !== null) {
        let albums = this.albums.filter(a => a.userId === userId);
        return albums.length;
      } 
      return 0;
    },
    getPhotosFromUser(userId) {
      if (this.albums !== null) {
        let albums = this.albums.filter(a => a.userId === userId).map(a => a.id);
        if (this.photos !== null) {
          let photos = this.photos.filter(c => albums.includes(c.albumId));
          return photos.length;
        }
        return 0;
      } 
      return 0;
    }
  },
  computed: {
    filteredUsers() {
      if (this.users !== null) {
        return this.users.filter(user => {
          return (
            user.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
            user.username.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          );
        });
      } else return null;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/styles/tables";
</style>
