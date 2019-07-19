<template>
  <div class="table-component">
    <div class="loading" v-if="loading">Loading...</div>
    <div v-if="filteredUsers">
      <div class="search-box">
        <div class="row">
          <div class="col-md-8">
            <h2 class="title">Users</h2>
          </div>
          <div class="col-md-4">
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
      <div class="row" style="margin-bottom: 10px;">
        <div class="col-md-12">
          <router-link class="btn btn-primary float-right" to="/users/new">Register</router-link>
        </div>
      </div>
      <div class="table-container">
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
              <td>{{ makeRandomRideInGroupText(user) }}</td>
              <td>{{ makeRandomDaysOfWeekText(user) }}</td>
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
  </div>
</template>

<script>
import axios from "axios";
import _ from "lodash";

export default {
  name: "Table",
  data() {
    return {
      loading: false,
      search: "",
      posts: null,
      albums: null,
      photos: null
    };
  },
  mounted() {
    var headers = document.querySelectorAll("h1,h2,h3,h4,h5,h6");
    for (var i = 0; i < headers.length; i++) {
      headers[i].setAttribute("data-content", headers[i].innerHTML);
    }

    if (this.shared.isLoaded === false) {
      this.fetchUsers();
    }
    this.fetchPosts();
    this.fetchAlbums();
    this.fetchPhotos();
  },
  props: ["shared"],
  methods: {
    fetchPosts() {
      axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
        this.posts = response.data;
      });
    },
    fetchAlbums() {
      axios
        .get("https://jsonplaceholder.typicode.com/albums")
        .then(response => {
          this.albums = response.data;
        });
    },
    fetchPhotos() {
      axios
        .get("https://jsonplaceholder.typicode.com/photos")
        .then(response => {
          this.photos = response.data;
        });
    },
    fetchUsers() {
      this.loading = true;
      axios.get("https://jsonplaceholder.typicode.com/users").then(response => {
        this.loading = false;
        this.shared.isLoaded = true;
        if (this.shared.users.length > 0) {
          this.shared.users = _.merge(this.shared.users, response.data);
        } else {
          this.shared.users = response.data;
        }
      });
    },
    deleteRow: function(dialog, user) {
      let idx = this.shared.users.findIndex(c => c.id == user.id);
      this.shared.users.splice(idx, 1);
      dialog.close();
    },
    makeRandomRideInGroupText(user) {
      if (user.rideInGroup !== undefined) {
        return user.rideInGroup;
      } else {
        // Mock
        let options = ["Always", "Sometimes", "Never"];
        return options[Math.floor(Math.random() * options.length)];
      }
    },
    makeRandomDaysOfWeekText(user) {
      if (user.daysOfWeek !== undefined) {
        return user.daysOfWeek;
      } else {
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
      }
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
        let albums = this.albums
          .filter(a => a.userId === userId)
          .map(a => a.id);
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
      if (this.shared.users !== null) {
        return this.shared.users.filter(user => {
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
