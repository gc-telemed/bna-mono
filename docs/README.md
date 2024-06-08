# Generalized Data Primitives \& Reactors

We will introduce 3 kinds of stores a la `nanostore` and `svelte store`:

- singleton, boolean, n-tuple
- map / m1
- map-map / m2
- m3
- store-map

All of these are primitives in the avian-framework used internally the by `cosys.work` teams.
An avian store fulfills the store-contract of a svelte store.

## Singleton [ Unit / Mono / Val  ]

- A singleton is defined by the singular-ness of the item it represents. 
- In our case, it is a store where only item may reside at any given moment. 
- The value of the item may change but the item itself is defined by its singular and
  continued presence inside its storage container.

## Boolean  [ Either / And / Or / Not / If-Else / When ]

- A boolean is defined by the dual-ness of the values it represents.
- In our case, it is a store which unlike the singleton store, can also represent a discontinuous presence of the item the store represents in any given duration.
- The value of the item may get toggled over time but there is always a default value.
- The default value itself can optionally be considered as a discontinuity of `presence` in the context of `stores` (or `inhabited` in the context of `sets`)

## N-tuple [ Cross / Zip / Fold / Rx ]

- A n-tuple is defined by the n-arity of the values it represents.
- In our case, it is a store which can hold n singleton items in a single store instead of needing n different stores for the same. 
- n-tuples can be used to provide a list-like iterable or an indexed array-like iterable.
- List-like iterables provided in the library also provide an option to enable monad-like bind, join and kleisli (fish) interfaces and/or implementations.

## Map [ KeySet, EntrySet, MetadataMap ]

### Map of Maps

### Map of Map of Maps...

### Map of Stores
