# collaborative-whiteboard-2

Collaborative Whiteboard with Angular

## Installation

```scss
// CW uses Angular CDK overlay
@import "~@angular/cdk/overlay-prebuilt.css";

// Add CW styles
@import "../projects/collaborative-whiteboard/src/lib/styles/cw.core.scss";
```

## Notes for deploying on Github pages

- Duplicate `index.html` for `404.html`.
- Add `404.html` to `ngsw.json`.

- In `manifest.webmanifest` use:

  ```txt
    "scope": "/collaborative-whiteboard-2/",
    "start_url": "/collaborative-whiteboard-2/",
  ```
