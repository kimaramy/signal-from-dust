# Dataset

## Translations

- [한국어](./README.ko.md)

## Roles

1. It receives a dataset for each domain from the parent, maps it to the data needed to build the scene, and passes it to sequence.
2. Primarily, it is used as a page view of a server-side rendered page (or domain). It can also be passed a callback so that server data updates can be executed on the client.
3. To give you the flexibility to change how each page is rendered, we allow clients to make data requests directly from the client via react-query hooks and others.
