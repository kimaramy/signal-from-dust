# Sequence

## Translations

- [한국어](./README.ko.md)

## Description

A series of scenes is called a sequence.

It's easy to think of them as layout roles for laying out a scene or scenes, but the reason for separating them from the `@/components/scene` set is to let the scene components take responsibility for outputting data, and to make them available independently of the domain. This helps to prepare for changing requirements and makes testing easier.

## Roles

1. Take the list of scene data from the dataset and map it one more time for domain-specific needs and pass it to the scenes.
2. Arrange a scene or multiple scenes according to a layout policy.
3. Manage the state required to allow a particular scene to interact with other scenes.
