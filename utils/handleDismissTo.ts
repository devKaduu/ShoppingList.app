import { Href, Router } from "expo-router";

export function handleDismissTo(screen: Href, router: Router) {
  if (router.canDismiss()) {
    router.dismiss();

    setTimeout(() => {
      router.push(screen);
    }, 100);
  }
}
