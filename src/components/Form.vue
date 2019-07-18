<template>
  <div class="form-component">
    <h1>Registration</h1>
    <form class="needs-validation" id="registration-form">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="firstName">Username</label>
            <input
              type="text"
              class="form-control"
              v-model="username"
              name="username"
              id="username"
              required
            />
            <span
              class="text-danger"
              v-if="validationErrors.username"
              v-text="validationErrors.username"
            ></span>
          </div>
          <div class="form-group">
            <label for="lastName">Name</label>
            <input type="text" class="form-control" v-model="name" name="name" id="name" required />
            <span class="text-danger" v-if="validationErrors.name" v-text="validationErrors.name"></span>
          </div>
          <div class="form-group">
            <label for="lastName">E-mail</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
              name="email"
              id="email"
              required
            />
            <small id="passwordHelpBlock" class="form-text text-muted">username@domain.com</small>
            <span class="text-danger" v-if="validationErrors.email" v-text="validationErrors.email"></span>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label for="lastName" style="width: 100%;">
              <span>City</span>
              <small class="form-text text-muted float-right">Optional</small>
            </label>
            <input type="text" class="form-control" v-model="city" name="city" id="city" />
          </div>

          <div class="form-group">
            <label for="ride-in-group-always" style="display: block;">Ride in group</label>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="ride-in-group-always"
                name="ride-in-group"
                class="custom-control-input"
                checked
                value="Always"
              />
              <label class="custom-control-label" for="ride-in-group-always">Always</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="ride-in-group-sometimes"
                name="ride-in-group"
                class="custom-control-input"
                value="Sometimes"
                v-model="rideInGroup"
              />
              <label class="custom-control-label" for="ride-in-group-sometimes">Sometimes</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input
                type="radio"
                id="ride-in-group-never"
                name="ride-in-group"
                class="custom-control-input"
                value="Never"
                v-model="rideInGroup"
              />
              <label class="custom-control-label" for="ride-in-group-never">Never</label>
            </div>
          </div>
          <div class="form-group">
            <label for="days-of-week-sun" style="display: block;">Days of the week</label>
            <div class="custom-control custom-checkbox custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="days-of-week-sun"
                name="days-of-week"
                value="Sun"
                v-model="daysOfWeek"
              />
              <label class="custom-control-label" for="days-of-week-sun">Sun</label>
            </div>
            <div class="custom-control custom-checkbox custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="days-of-week-mon"
                name="days-of-week"
                value="Mon"
                v-model="daysOfWeek"
              />
              <label class="custom-control-label" for="days-of-week-mon">Mon</label>
            </div>
            <div class="custom-control custom-checkbox custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="days-of-week-tue"
                name="days-of-week"
                value="Tue"
                v-model="daysOfWeek"
              />
              <label class="custom-control-label" for="days-of-week-tue">Tue</label>
            </div>
            <div class="custom-control custom-checkbox custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="days-of-week-wed"
                name="days-of-week"
                value="Wed"
                v-model="daysOfWeek"
              />
              <label class="custom-control-label" for="days-of-week-wed">Wed</label>
            </div>
            <div class="custom-control custom-checkbox custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="days-of-week-thu"
                name="days-of-week"
                value="Thu"
                v-model="daysOfWeek"
              />
              <label class="custom-control-label" for="days-of-week-thu">Thu</label>
            </div>
            <div class="custom-control custom-checkbox custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="days-of-week-fri"
                name="days-of-week"
                value="Fri"
                v-model="daysOfWeek"
              />
              <label class="custom-control-label" for="days-of-week-fri">Fri</label>
            </div>
            <div class="custom-control custom-checkbox custom-control-inline">
              <input
                type="checkbox"
                class="custom-control-input"
                id="days-of-week-sat"
                name="days-of-week"
                value="Sat"
                v-model="daysOfWeek"
              />
              <label class="custom-control-label" for="days-of-week-sat">Sat</label>
            </div>
            <div>
              <span
                class="text-danger"
                v-if="validationErrors.daysOfWeek"
                v-text="validationErrors.daysOfWeek"
              ></span>
            </div>
          </div>
        </div>
      </div>

      <button class="btn btn-primary" type="submit" @click.prevent="submitForm()">Save</button>
      &nbsp;
      <router-link class="btn btn-light" to="/users">Discard</router-link>
    </form>
  </div>
</template>

<script>
import v1 from "uuid/v1";

export default {
  name: "Form",
  props: ["shared"],
  data: function() {
    return {
      username: null,
      name: null,
      email: null,
      city: null,
      daysOfWeek: [],
      rideInGroup: 'Always',
      validationErrors: {
        username: null,
        name: null,
        email: null,
        daysOfWeek: null
      }
    };
  },
  methods: {
    submitForm() {
      if (this.validateForm()) {
        let newUser = {
          id: v1(),
          name: this.name,
          username: this.username,
          email: this.email,
          address: {
            city: this.city
          },
          daysOfWeek: this.daysOfWeek.join(", "),
          rideInGroup: this.rideInGroup
        };
        this.shared.users.push(newUser);

        // Redirect to /users path
        this.$router.push("/users");
      }
    },
    validateForm() {
      var formId = "registration-form";
      var nodes = document.querySelectorAll(`#${formId} :invalid`);
      var vm = this;

      Object.keys(this.validationErrors).forEach(key => {
        this.validationErrors[key] = null;
      });

      let isClear = true;
      if (this.daysOfWeek.length === 0) {
        this.validationErrors["daysOfWeek"] =
          "Selecione ao menos um dia da semana";
        isClear = false;
      }
      if (nodes.length > 0) {
        nodes.forEach(node => {
          this.validationErrors[node.name] = node.validationMessage;
          node.addEventListener("change", function() {
            vm.validateForm();
          });
        });
        isClear = false;
      }
      return isClear;
    }
  }
};
</script>

