import NavbarComponent from "./NavbarComponent.vue";
// import {app} from "@storybook/vue3";

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Navbar',
  component: NavbarComponent,
};

export const Primary = () => ({
  components: { NavbarComponent },
  template: '<NavbarComponent />',
});

// app.component(NavbarComponent.name, NavbarComponent);