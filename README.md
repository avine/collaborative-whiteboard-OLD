# collaborative-whiteboard

Collaborative Whiteboard with Angular

## Installation

```scss
// CW uses Angular CDK overlay
@import "~@angular/cdk/overlay-prebuilt.css";

// Add CW styles
@import "../projects/collaborative-whiteboard/src/lib/styles/cw.core.scss";
```

## Notes for deploying on Github pages

- Run `ng build --prod --base-href /collaborative-whiteboard/`
- Duplicate `index.html` for `404.html`.
- Add `404.html` to `ngsw.json`.
