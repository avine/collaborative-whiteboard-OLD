# collaborative-whiteboard-2

Collaborative Whiteboard with Angular

## Notes for deploying on Github pages

- Duplicate `index.html` for `404.html`.
- Add `404.html` to `ngsw.json`.

- In `manifest.webmanifest` use:

  ```txt
    "scope": "/collaborative-whiteboard-2/",
    "start_url": "/collaborative-whiteboard-2/",
  ```
