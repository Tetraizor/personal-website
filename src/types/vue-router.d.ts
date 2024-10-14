import "vue";
import { Router } from "vue-router";

declare module "vue" {
  interface ComponentCustomProperties {
    $router: Router;
    $route: RouteRecordRaw;
  }
}
